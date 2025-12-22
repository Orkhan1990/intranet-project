import { MigrationInterface, QueryRunner } from "typeorm";

export class Migartions1766405877767 implements MigrationInterface {
    name = 'Migartions1766405877767'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`accounts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`account_id\` varchar(255) NOT NULL, \`date\` date NOT NULL, \`send_with\` varchar(255) NULL, \`send_with_date\` timestamp NULL, \`account_receive\` varchar(255) NULL, \`vhfnum\` varchar(255) NULL, \`vhf_date\` timestamp NULL, \`otk\` int NULL, \`card_id\` int NULL, UNIQUE INDEX \`REL_cd301a55569e62207e24c1597b\` (\`card_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`repairs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`repair_id\` varchar(255) NOT NULL, \`date\` timestamp NOT NULL, \`otk\` double NULL, \`card_id\` int NULL, UNIQUE INDEX \`REL_40e99e6d63027d83eb09241c06\` (\`card_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD \`accountId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD UNIQUE INDEX \`IDX_feb35b86695f9af40d2c1ef1ba\` (\`accountId\`)`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD \`repairId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD UNIQUE INDEX \`IDX_84c8a940078408ba51cef11fff\` (\`repairId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_feb35b86695f9af40d2c1ef1ba\` ON \`cards\` (\`accountId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_84c8a940078408ba51cef11fff\` ON \`cards\` (\`repairId\`)`);
        await queryRunner.query(`ALTER TABLE \`accounts\` ADD CONSTRAINT \`FK_cd301a55569e62207e24c1597b0\` FOREIGN KEY (\`card_id\`) REFERENCES \`cards\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`repairs\` ADD CONSTRAINT \`FK_40e99e6d63027d83eb09241c060\` FOREIGN KEY (\`card_id\`) REFERENCES \`cards\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD CONSTRAINT \`FK_feb35b86695f9af40d2c1ef1ba6\` FOREIGN KEY (\`accountId\`) REFERENCES \`accounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD CONSTRAINT \`FK_84c8a940078408ba51cef11fff9\` FOREIGN KEY (\`repairId\`) REFERENCES \`repairs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cards\` DROP FOREIGN KEY \`FK_84c8a940078408ba51cef11fff9\``);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP FOREIGN KEY \`FK_feb35b86695f9af40d2c1ef1ba6\``);
        await queryRunner.query(`ALTER TABLE \`repairs\` DROP FOREIGN KEY \`FK_40e99e6d63027d83eb09241c060\``);
        await queryRunner.query(`ALTER TABLE \`accounts\` DROP FOREIGN KEY \`FK_cd301a55569e62207e24c1597b0\``);
        await queryRunner.query(`DROP INDEX \`REL_84c8a940078408ba51cef11fff\` ON \`cards\``);
        await queryRunner.query(`DROP INDEX \`REL_feb35b86695f9af40d2c1ef1ba\` ON \`cards\``);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP INDEX \`IDX_84c8a940078408ba51cef11fff\``);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`repairId\``);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP INDEX \`IDX_feb35b86695f9af40d2c1ef1ba\``);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`accountId\``);
        await queryRunner.query(`DROP INDEX \`REL_40e99e6d63027d83eb09241c06\` ON \`repairs\``);
        await queryRunner.query(`DROP TABLE \`repairs\``);
        await queryRunner.query(`DROP INDEX \`REL_cd301a55569e62207e24c1597b\` ON \`accounts\``);
        await queryRunner.query(`DROP TABLE \`accounts\``);
    }

}
