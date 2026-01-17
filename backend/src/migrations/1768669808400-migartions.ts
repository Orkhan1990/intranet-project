import { MigrationInterface, QueryRunner } from "typeorm";

export class Migartions1768669808400 implements MigrationInterface {
    name = 'Migartions1768669808400'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card_worker_jobs\` CHANGE \`worker_av\` \`worker_av\` decimal(10,3) NOT NULL DEFAULT '0.000'`);
        await queryRunner.query(`ALTER TABLE \`card_worker_jobs\` DROP COLUMN \`salaryPercent\``);
        await queryRunner.query(`ALTER TABLE \`card_worker_jobs\` ADD \`salaryPercent\` decimal(10,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`card_jobs\` DROP COLUMN \`av\``);
        await queryRunner.query(`ALTER TABLE \`card_jobs\` ADD \`av\` decimal(10,3) NULL`);
        await queryRunner.query(`ALTER TABLE \`card_jobs\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`card_jobs\` ADD \`price\` decimal(10,2) NULL`);
        await queryRunner.query(`ALTER TABLE \`card_jobs\` DROP COLUMN \`discount\``);
        await queryRunner.query(`ALTER TABLE \`card_jobs\` ADD \`discount\` decimal(10,2) NULL`);
        await queryRunner.query(`ALTER TABLE \`card_jobs\` DROP COLUMN \`discount_price\``);
        await queryRunner.query(`ALTER TABLE \`card_jobs\` ADD \`discount_price\` decimal(10,2) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card_jobs\` DROP COLUMN \`discount_price\``);
        await queryRunner.query(`ALTER TABLE \`card_jobs\` ADD \`discount_price\` float(12) NULL`);
        await queryRunner.query(`ALTER TABLE \`card_jobs\` DROP COLUMN \`discount\``);
        await queryRunner.query(`ALTER TABLE \`card_jobs\` ADD \`discount\` float(12) NULL`);
        await queryRunner.query(`ALTER TABLE \`card_jobs\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`card_jobs\` ADD \`price\` float(12) NULL`);
        await queryRunner.query(`ALTER TABLE \`card_jobs\` DROP COLUMN \`av\``);
        await queryRunner.query(`ALTER TABLE \`card_jobs\` ADD \`av\` float(12) NULL`);
        await queryRunner.query(`ALTER TABLE \`card_worker_jobs\` DROP COLUMN \`salaryPercent\``);
        await queryRunner.query(`ALTER TABLE \`card_worker_jobs\` ADD \`salaryPercent\` float(12) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`card_worker_jobs\` CHANGE \`worker_av\` \`worker_av\` decimal(10,2) NOT NULL DEFAULT '0.00'`);
    }

}
