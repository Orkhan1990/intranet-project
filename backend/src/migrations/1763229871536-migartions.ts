import { MigrationInterface, QueryRunner } from "typeorm";

export class Migartions1763229871536 implements MigrationInterface {
    name = 'Migartions1763229871536'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cards\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD CONSTRAINT \`FK_7b7230897ecdeb7d6b0576d907b\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cards\` DROP FOREIGN KEY \`FK_7b7230897ecdeb7d6b0576d907b\``);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`userId\``);
    }

}
