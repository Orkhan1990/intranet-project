import { MigrationInterface, QueryRunner } from "typeorm";

export class Migartions1762633126225 implements MigrationInterface {
    name = 'Migartions1762633126225'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cards\` CHANGE \`recommendation\` \`recommendation\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cards\` CHANGE \`recommendation\` \`recommendation\` varchar(255) NOT NULL DEFAULT '1'`);
    }

}
