import { MigrationInterface, QueryRunner } from "typeorm";

export class Migartions1763304503100 implements MigrationInterface {
    name = 'Migartions1763304503100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card_worker_jobs\` DROP COLUMN \`salaryPercent\``);
        await queryRunner.query(`ALTER TABLE \`card_worker_jobs\` ADD \`salaryPercent\` float NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card_worker_jobs\` DROP COLUMN \`salaryPercent\``);
        await queryRunner.query(`ALTER TABLE \`card_worker_jobs\` ADD \`salaryPercent\` decimal(5,2) NOT NULL`);
    }

}
