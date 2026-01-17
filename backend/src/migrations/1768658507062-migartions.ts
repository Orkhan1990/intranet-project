import { MigrationInterface, QueryRunner } from "typeorm";

export class Migartions1768658507062 implements MigrationInterface {
    name = 'Migartions1768658507062'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card_jobs\` ADD \`discount_price\` float NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card_jobs\` DROP COLUMN \`discount_price\``);
    }

}
