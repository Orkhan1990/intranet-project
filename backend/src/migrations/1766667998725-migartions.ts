import { MigrationInterface, QueryRunner } from "typeorm";

export class Migartions1766667998725 implements MigrationInterface {
    name = 'Migartions1766667998725'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cards\` DROP FOREIGN KEY \`FK_84c8a940078408ba51cef11fff9\``);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP FOREIGN KEY \`FK_feb35b86695f9af40d2c1ef1ba6\``);
        await queryRunner.query(`DROP INDEX \`REL_84c8a940078408ba51cef11fff\` ON \`cards\``);
        await queryRunner.query(`DROP INDEX \`REL_feb35b86695f9af40d2c1ef1ba\` ON \`cards\``);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`accountId\``);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`repairId\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cards\` ADD \`repairId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD \`accountId\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_feb35b86695f9af40d2c1ef1ba\` ON \`cards\` (\`accountId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_84c8a940078408ba51cef11fff\` ON \`cards\` (\`repairId\`)`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD CONSTRAINT \`FK_feb35b86695f9af40d2c1ef1ba6\` FOREIGN KEY (\`accountId\`) REFERENCES \`accounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD CONSTRAINT \`FK_84c8a940078408ba51cef11fff9\` FOREIGN KEY (\`repairId\`) REFERENCES \`repairs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
