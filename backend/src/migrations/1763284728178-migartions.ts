import { MigrationInterface, QueryRunner } from "typeorm";

export class Migartions1763284728178 implements MigrationInterface {
    name = 'Migartions1763284728178'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`FK_b1ad2226066f54b039e8824f6a3\` ON \`card_jobs\``);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD \`av_sum\` double NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`av_sum\``);
        await queryRunner.query(`CREATE INDEX \`FK_b1ad2226066f54b039e8824f6a3\` ON \`card_jobs\` (\`cardId\`)`);
    }

}
