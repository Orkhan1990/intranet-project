import { MigrationInterface, QueryRunner } from "typeorm";

export class Migartions1773572943526 implements MigrationInterface {
    name = 'Migartions1773572943526'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`spare_parts\` DROP FOREIGN KEY \`FK_ba064d16d4c7670ff5443237b95\``);
        await queryRunner.query(`ALTER TABLE \`spare_parts\` DROP COLUMN \`supplier_id\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`spare_parts\` ADD \`supplier_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`spare_parts\` ADD CONSTRAINT \`FK_ba064d16d4c7670ff5443237b95\` FOREIGN KEY (\`supplier_id\`) REFERENCES \`suppliers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
