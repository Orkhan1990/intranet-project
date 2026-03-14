import { MigrationInterface, QueryRunner } from "typeorm";

export class Migartions1773497661930 implements MigrationInterface {
    name = 'Migartions1773497661930'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_e330caaac3e957507b2a7afd8b6\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`prixodHistId\``);
        await queryRunner.query(`ALTER TABLE \`prixod_hist\` DROP COLUMN \`confirmDate\``);
        await queryRunner.query(`ALTER TABLE \`prixod_hist\` ADD \`confirmDate\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`prixod_hist\` DROP COLUMN \`acceptDate\``);
        await queryRunner.query(`ALTER TABLE \`prixod_hist\` ADD \`acceptDate\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`prixod_hist\` DROP COLUMN \`date\``);
        await queryRunner.query(`ALTER TABLE \`prixod_hist\` ADD \`date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`prixod_hist\` DROP COLUMN \`date\``);
        await queryRunner.query(`ALTER TABLE \`prixod_hist\` ADD \`date\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`prixod_hist\` DROP COLUMN \`acceptDate\``);
        await queryRunner.query(`ALTER TABLE \`prixod_hist\` ADD \`acceptDate\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`prixod_hist\` DROP COLUMN \`confirmDate\``);
        await queryRunner.query(`ALTER TABLE \`prixod_hist\` ADD \`confirmDate\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`prixodHistId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_e330caaac3e957507b2a7afd8b6\` FOREIGN KEY (\`prixodHistId\`) REFERENCES \`prixod_hist\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
