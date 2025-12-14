import { MigrationInterface, QueryRunner } from "typeorm";

export class Migartions1765734666632 implements MigrationInterface {
    name = 'Migartions1765734666632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card_parts\` ADD \`code\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card_parts\` DROP COLUMN \`code\``);
    }

}
