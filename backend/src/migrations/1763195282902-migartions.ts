import { MigrationInterface, QueryRunner } from "typeorm";

export class Migartions1763195282902 implements MigrationInterface {
    name = 'Migartions1763195282902'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cards\` ADD \`is_open\` tinyint NOT NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`is_open\``);
    }

}
