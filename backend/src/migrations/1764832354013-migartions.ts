import { MigrationInterface, QueryRunner } from "typeorm";

export class Migartions1764832354013 implements MigrationInterface {
    name = 'Migartions1764832354013'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cards\` ADD \`brandId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD CONSTRAINT \`FK_5c307c0c1720915e42cf6636878\` FOREIGN KEY (\`brandId\`) REFERENCES \`brands\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cards\` DROP FOREIGN KEY \`FK_5c307c0c1720915e42cf6636878\``);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`brandId\``);
    }

}
