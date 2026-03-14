import { MigrationInterface, QueryRunner } from "typeorm";

export class Migartions1773496701578 implements MigrationInterface {
    name = 'Migartions1773496701578'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_eb4413e8b5898a8a9e2785a430c\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`prixodsId\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`prixodsId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_eb4413e8b5898a8a9e2785a430c\` FOREIGN KEY (\`prixodsId\`) REFERENCES \`prixods\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
