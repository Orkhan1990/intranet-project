import { MigrationInterface, QueryRunner } from "typeorm";

export class Migartions1773148879334 implements MigrationInterface {
    name = 'Migartions1773148879334'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cards\` CHANGE \`qost_number\` \`engine_number\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`engine_number\``);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD \`engine_number\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`engine_number\``);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD \`engine_number\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`cards\` CHANGE \`engine_number\` \`qost_number\` varchar(255) NULL`);
    }

}
