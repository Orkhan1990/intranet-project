import { MigrationInterface, QueryRunner } from "typeorm";

export class Migartions1768668294558 implements MigrationInterface {
    name = 'Migartions1768668294558'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card_worker_jobs\` CHANGE \`worker_av\` \`worker_av\` decimal(10,3) NOT NULL DEFAULT '0.000'`);
        await queryRunner.query(`ALTER TABLE \`card_worker_jobs\` DROP COLUMN \`salaryPercent\``);
        await queryRunner.query(`ALTER TABLE \`card_worker_jobs\` ADD \`salaryPercent\` decimal(10,2) NOT NULL DEFAULT '0.00'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card_worker_jobs\` DROP COLUMN \`salaryPercent\``);
        await queryRunner.query(`ALTER TABLE \`card_worker_jobs\` ADD \`salaryPercent\` float(12) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`card_worker_jobs\` CHANGE \`worker_av\` \`worker_av\` decimal(10,2) NOT NULL DEFAULT '0.00'`);
    }

}
