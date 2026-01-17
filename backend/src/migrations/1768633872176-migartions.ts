import { MigrationInterface, QueryRunner } from "typeorm";

export class Migartions1768633872176 implements MigrationInterface {
    name = 'Migartions1768633872176'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cards\` ADD \`is_way_out\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD \`way_out_direction\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD \`way_out_workers\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD \`way_out_car\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD \`way_out_distance\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD \`way_out_work_time\` double NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`way_out_work_time\``);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`way_out_distance\``);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`way_out_car\``);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`way_out_workers\``);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`way_out_direction\``);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`is_way_out\``);
    }

}
