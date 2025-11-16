import { MigrationInterface, QueryRunner } from "typeorm";

export class Migartions1763288267478 implements MigrationInterface {
    name = 'Migartions1763288267478'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`cards\` CHANGE \`type\` \`type\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`cards\` CHANGE \`manufactured\` \`manufactured\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`cards\` CHANGE \`model\` \`model\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`cards\` CHANGE \`sassi\` \`sassi\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`cards\` CHANGE \`car_number\` \`car_number\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`cards\` CHANGE \`produce_date\` \`produce_date\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`cards\` CHANGE \`km\` \`km\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`cards\` CHANGE \`qost_number\` \`qost_number\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`cards\` CHANGE \`payment_type\` \`payment_type\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cards\` CHANGE \`payment_type\` \`payment_type\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cards\` CHANGE \`qost_number\` \`qost_number\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cards\` CHANGE \`km\` \`km\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cards\` CHANGE \`produce_date\` \`produce_date\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cards\` CHANGE \`car_number\` \`car_number\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cards\` CHANGE \`sassi\` \`sassi\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cards\` CHANGE \`model\` \`model\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cards\` CHANGE \`manufactured\` \`manufactured\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cards\` CHANGE \`type\` \`type\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD \`userId\` int NULL`);
    }

}
