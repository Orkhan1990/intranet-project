import { MigrationInterface, QueryRunner } from "typeorm";

export class Migartions1769539370669 implements MigrationInterface {
    name = 'Migartions1769539370669'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`jobs_list\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`code\` varchar(50) NOT NULL, \`name\` varchar(255) NOT NULL, \`av\` decimal(5,2) NOT NULL DEFAULT '0.00', \`isActive\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_daa449b3cc3e8ab8d6e2ca9741\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`card_jobs\` DROP COLUMN \`oil\``);
        await queryRunner.query(`ALTER TABLE \`card_jobs\` ADD \`oil\` double NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card_jobs\` DROP COLUMN \`oil\``);
        await queryRunner.query(`ALTER TABLE \`card_jobs\` ADD \`oil\` varchar(255) NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_daa449b3cc3e8ab8d6e2ca9741\` ON \`jobs_list\``);
        await queryRunner.query(`DROP TABLE \`jobs_list\``);
    }

}
