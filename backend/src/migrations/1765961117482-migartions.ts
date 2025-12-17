import { MigrationInterface, QueryRunner } from "typeorm";

export class Migartions1765961117482 implements MigrationInterface {
    name = 'Migartions1765961117482'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card_problems\` ADD \`descript\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card_problems\` DROP COLUMN \`descript\``);
    }

}
