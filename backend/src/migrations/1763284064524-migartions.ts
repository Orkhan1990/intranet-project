import { MigrationInterface, QueryRunner } from "typeorm";

export class Migartions1763284064524 implements MigrationInterface {
    name = 'Migartions1763284064524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card_jobs\` DROP FOREIGN KEY \`FK_b1ad2226066f54b039e8824f6a3\``);
        await queryRunner.query(`CREATE TABLE \`card_expenses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`description\` varchar(255) NOT NULL, \`price\` double NOT NULL DEFAULT '0', \`cardId\` int NOT NULL, \`card_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`card_jobs\` ADD \`card_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`card_jobs\` CHANGE \`cardId\` \`cardId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`card_expenses\` ADD CONSTRAINT \`FK_d7e1ee283c496be200cf2dc2cd5\` FOREIGN KEY (\`card_id\`) REFERENCES \`cards\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`card_jobs\` ADD CONSTRAINT \`FK_c26935a84713358c0667d97a446\` FOREIGN KEY (\`card_id\`) REFERENCES \`cards\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card_jobs\` DROP FOREIGN KEY \`FK_c26935a84713358c0667d97a446\``);
        await queryRunner.query(`ALTER TABLE \`card_expenses\` DROP FOREIGN KEY \`FK_d7e1ee283c496be200cf2dc2cd5\``);
        await queryRunner.query(`ALTER TABLE \`card_jobs\` CHANGE \`cardId\` \`cardId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`card_jobs\` DROP COLUMN \`card_id\``);
        await queryRunner.query(`DROP TABLE \`card_expenses\``);
        await queryRunner.query(`ALTER TABLE \`card_jobs\` ADD CONSTRAINT \`FK_b1ad2226066f54b039e8824f6a3\` FOREIGN KEY (\`cardId\`) REFERENCES \`cards\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
