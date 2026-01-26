import { MigrationInterface, QueryRunner } from "typeorm";

export class Migartions1769432581581 implements MigrationInterface {
    name = 'Migartions1769432581581'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card_parts\` ADD \`used_price\` double NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card_parts\` DROP COLUMN \`used_price\``);
    }

}
