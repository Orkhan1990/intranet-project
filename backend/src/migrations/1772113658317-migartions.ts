import { MigrationInterface, QueryRunner } from "typeorm";

export class Migartions1772113658317 implements MigrationInterface {
    name = 'Migartions1772113658317'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cards\` ADD \`warranty_status\` enum ('none', 'send', 'paid') NOT NULL DEFAULT 'none'`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD \`warranty_send_date\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD \`warranty_paid_date\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD \`warranty_job\` decimal(12,2) NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD \`warranty_part\` decimal(12,2) NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD \`warranty_add_expenses\` decimal(12,2) NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD \`warranty_currency\` decimal(12,4) NULL DEFAULT '1.0000'`);
        await queryRunner.query(`ALTER TABLE \`card_expenses\` DROP FOREIGN KEY \`FK_d7e1ee283c496be200cf2dc2cd5\``);
        await queryRunner.query(`ALTER TABLE \`card_expenses\` CHANGE \`card_id\` \`card_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`card_expenses\` ADD CONSTRAINT \`FK_d7e1ee283c496be200cf2dc2cd5\` FOREIGN KEY (\`card_id\`) REFERENCES \`cards\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card_expenses\` DROP FOREIGN KEY \`FK_d7e1ee283c496be200cf2dc2cd5\``);
        await queryRunner.query(`ALTER TABLE \`card_expenses\` CHANGE \`card_id\` \`card_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`card_expenses\` ADD CONSTRAINT \`FK_d7e1ee283c496be200cf2dc2cd5\` FOREIGN KEY (\`card_id\`) REFERENCES \`cards\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`warranty_currency\``);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`warranty_add_expenses\``);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`warranty_part\``);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`warranty_job\``);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`warranty_paid_date\``);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`warranty_send_date\``);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`warranty_status\``);
    }

}
