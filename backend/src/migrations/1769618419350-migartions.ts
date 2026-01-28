import { MigrationInterface, QueryRunner } from "typeorm";

export class Migartions1769618419350 implements MigrationInterface {
    name = 'Migartions1769618419350'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cards\` ADD \`closed_by_user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD CONSTRAINT \`FK_205ffa963a2e5bc93c65b79afb7\` FOREIGN KEY (\`closed_by_user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cards\` DROP FOREIGN KEY \`FK_205ffa963a2e5bc93c65b79afb7\``);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`closed_by_user_id\``);
    }

}
