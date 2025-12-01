import { MigrationInterface, QueryRunner } from "typeorm";

export class Migartions1764589680972 implements MigrationInterface {
    name = 'Migartions1764589680972'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`isReception\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`isReception\``);
    }

}
