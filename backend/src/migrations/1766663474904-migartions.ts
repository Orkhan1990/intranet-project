import { MigrationInterface, QueryRunner } from "typeorm";

export class Migartions1766663474904 implements MigrationInterface {
    name = 'Migartions1766663474904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`repairs\` DROP COLUMN \`repair_id\``);
        await queryRunner.query(`ALTER TABLE \`repairs\` ADD \`repair_id\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`repairs\` DROP COLUMN \`repair_id\``);
        await queryRunner.query(`ALTER TABLE \`repairs\` ADD \`repair_id\` varchar(255) NOT NULL`);
    }

}
