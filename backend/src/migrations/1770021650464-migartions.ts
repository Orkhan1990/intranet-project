import { MigrationInterface, QueryRunner } from "typeorm";

export class Migartions1770021650464 implements MigrationInterface {
    name = 'Migartions1770021650464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card_parts\` DROP FOREIGN KEY \`FK_9f092615c5b3cbc780c5a118b43\``);
        await queryRunner.query(`ALTER TABLE \`card_parts\` CHANGE \`card_id\` \`card_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`card_parts\` ADD CONSTRAINT \`FK_9f092615c5b3cbc780c5a118b43\` FOREIGN KEY (\`card_id\`) REFERENCES \`cards\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card_parts\` DROP FOREIGN KEY \`FK_9f092615c5b3cbc780c5a118b43\``);
        await queryRunner.query(`ALTER TABLE \`card_parts\` CHANGE \`card_id\` \`card_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`card_parts\` ADD CONSTRAINT \`FK_9f092615c5b3cbc780c5a118b43\` FOREIGN KEY (\`card_id\`) REFERENCES \`cards\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
