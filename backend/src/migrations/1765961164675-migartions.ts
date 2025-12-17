import { MigrationInterface, QueryRunner } from "typeorm";

export class Migartions1765961164675 implements MigrationInterface {
    name = 'Migartions1765961164675'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card_problems\` DROP COLUMN \`descript\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card_problems\` ADD \`descript\` varchar(255) NOT NULL`);
    }

}
