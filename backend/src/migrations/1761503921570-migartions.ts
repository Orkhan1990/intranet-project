import { MigrationInterface, QueryRunner } from "typeorm";

export class Migartions1761503921570 implements MigrationInterface {
    name = 'Migartions1761503921570'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`percent\` \`percentage\` float NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`percentage\` \`percent\` float NULL`);
    }

}
