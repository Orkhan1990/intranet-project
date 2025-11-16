import { MigrationInterface, QueryRunner } from "typeorm";

export class Migartions1763280815561 implements MigrationInterface {
    name = 'Migartions1763280815561'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cards\` ADD \`model\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD \`is_open\` tinyint NOT NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`is_open\``);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`model\``);
    }

}
