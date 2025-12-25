import { MigrationInterface, QueryRunner } from "typeorm";

export class Migartions1766650853205 implements MigrationInterface {
    name = 'Migartions1766650853205'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_84c8a940078408ba51cef11fff\` ON \`cards\``);
        await queryRunner.query(`DROP INDEX \`IDX_feb35b86695f9af40d2c1ef1ba\` ON \`cards\``);
        await queryRunner.query(`CREATE TABLE \`account_sequence\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`current_value\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`accounts\` DROP COLUMN \`account_id\``);
        await queryRunner.query(`ALTER TABLE \`accounts\` ADD \`account_id\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`accounts\` DROP COLUMN \`account_id\``);
        await queryRunner.query(`ALTER TABLE \`accounts\` ADD \`account_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP TABLE \`account_sequence\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_feb35b86695f9af40d2c1ef1ba\` ON \`cards\` (\`accountId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_84c8a940078408ba51cef11fff\` ON \`cards\` (\`repairId\`)`);
    }

}
