import { MigrationInterface, QueryRunner } from "typeorm";

export class Migartions1763280766396 implements MigrationInterface {
    name = 'Migartions1763280766396'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`FK_7b7230897ecdeb7d6b0576d907b\` ON \`cards\``);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`is_open\``);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`model\``);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`spare_parts\` ADD CONSTRAINT \`FK_f0bd8db09a9c099a55b6b012252\` FOREIGN KEY (\`brand_id\`) REFERENCES \`brands\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`spare_parts\` ADD CONSTRAINT \`FK_adf6b06c418c928863d1c9a0627\` FOREIGN KEY (\`prixod_id\`) REFERENCES \`prixods\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`card_parts\` ADD CONSTRAINT \`FK_e3baa1dea8e68045b210654ffbc\` FOREIGN KEY (\`spare_part_id\`) REFERENCES \`spare_parts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`card_parts\` ADD CONSTRAINT \`FK_9f092615c5b3cbc780c5a118b43\` FOREIGN KEY (\`card_id\`) REFERENCES \`cards\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD CONSTRAINT \`FK_1c54b595af68cc3870b651e11c9\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cards\` DROP FOREIGN KEY \`FK_1c54b595af68cc3870b651e11c9\``);
        await queryRunner.query(`ALTER TABLE \`card_parts\` DROP FOREIGN KEY \`FK_9f092615c5b3cbc780c5a118b43\``);
        await queryRunner.query(`ALTER TABLE \`card_parts\` DROP FOREIGN KEY \`FK_e3baa1dea8e68045b210654ffbc\``);
        await queryRunner.query(`ALTER TABLE \`spare_parts\` DROP FOREIGN KEY \`FK_adf6b06c418c928863d1c9a0627\``);
        await queryRunner.query(`ALTER TABLE \`spare_parts\` DROP FOREIGN KEY \`FK_f0bd8db09a9c099a55b6b012252\``);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD \`model\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD \`is_open\` tinyint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`CREATE INDEX \`FK_7b7230897ecdeb7d6b0576d907b\` ON \`cards\` (\`user_id\`)`);
    }

}
