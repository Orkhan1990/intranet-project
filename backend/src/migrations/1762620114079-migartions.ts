import { MigrationInterface, QueryRunner } from "typeorm";

export class Migartions1762620114079 implements MigrationInterface {
    name = 'Migartions1762620114079'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`card_parts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`part_name\` varchar(255) NOT NULL, \`discount\` float NULL, \`date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`selled_price\` double NULL, \`net_price\` double NULL, \`count\` double NULL, \`cardId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`spare_parts\` ADD \`cardPartId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`card_parts\` ADD CONSTRAINT \`FK_73460e8d1293ba415180763a861\` FOREIGN KEY (\`cardId\`) REFERENCES \`cards\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`spare_parts\` ADD CONSTRAINT \`FK_529bd99a882415b704a52a21a2b\` FOREIGN KEY (\`cardPartId\`) REFERENCES \`card_parts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`spare_parts\` DROP FOREIGN KEY \`FK_529bd99a882415b704a52a21a2b\``);
        await queryRunner.query(`ALTER TABLE \`card_parts\` DROP FOREIGN KEY \`FK_73460e8d1293ba415180763a861\``);
        await queryRunner.query(`ALTER TABLE \`spare_parts\` DROP COLUMN \`cardPartId\``);
        await queryRunner.query(`DROP TABLE \`card_parts\``);
    }

}
