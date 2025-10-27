import { MigrationInterface, QueryRunner } from "typeorm";

export class Migartions1761588740106 implements MigrationInterface {
    name = 'Migartions1761588740106'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`prixods\` ADD \`is_confirmed\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`prixods\` DROP COLUMN \`is_confirmed\``);
    }

}
