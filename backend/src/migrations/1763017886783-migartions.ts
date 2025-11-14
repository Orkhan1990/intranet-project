import { MigrationInterface, QueryRunner } from "typeorm";

export class Migartions1763017886783 implements MigrationInterface {
    name = 'Migartions1763017886783'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card_worker_jobs\` DROP FOREIGN KEY \`FK_9305eb330e073c24c26fae46dcb\``);
        await queryRunner.query(`ALTER TABLE \`card_worker_jobs\` DROP COLUMN \`cardJobId\``);
        await queryRunner.query(`ALTER TABLE \`card_worker_jobs\` ADD \`card_job_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`card_worker_jobs\` DROP COLUMN \`worker_av\``);
        await queryRunner.query(`ALTER TABLE \`card_worker_jobs\` ADD \`worker_av\` decimal(10,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`card_worker_jobs\` CHANGE \`worker_id\` \`worker_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`card_worker_jobs\` ADD CONSTRAINT \`FK_31a8fef3148f265c43f6bfe48c9\` FOREIGN KEY (\`card_job_id\`) REFERENCES \`card_jobs\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`card_worker_jobs\` ADD CONSTRAINT \`FK_afd75821a337720cf661fb8e120\` FOREIGN KEY (\`worker_id\`) REFERENCES \`users\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card_worker_jobs\` DROP FOREIGN KEY \`FK_afd75821a337720cf661fb8e120\``);
        await queryRunner.query(`ALTER TABLE \`card_worker_jobs\` DROP FOREIGN KEY \`FK_31a8fef3148f265c43f6bfe48c9\``);
        await queryRunner.query(`ALTER TABLE \`card_worker_jobs\` CHANGE \`worker_id\` \`worker_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`card_worker_jobs\` DROP COLUMN \`worker_av\``);
        await queryRunner.query(`ALTER TABLE \`card_worker_jobs\` ADD \`worker_av\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`card_worker_jobs\` DROP COLUMN \`card_job_id\``);
        await queryRunner.query(`ALTER TABLE \`card_worker_jobs\` ADD \`cardJobId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`card_worker_jobs\` ADD CONSTRAINT \`FK_9305eb330e073c24c26fae46dcb\` FOREIGN KEY (\`cardJobId\`) REFERENCES \`card_jobs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
