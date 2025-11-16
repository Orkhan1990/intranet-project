import { MigrationInterface, QueryRunner } from "typeorm";

export class Migartions1763195029632 implements MigrationInterface {
    name = 'Migartions1763195029632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cards\` ADD \`parts_total_price\` float NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD \`work_sum\` float NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD \`parts_sum_own\` float NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD \`work_sum_own\` float NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`work_sum_own\``);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`parts_sum_own\``);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`work_sum\``);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`parts_total_price\``);
    }

}
