import { MigrationInterface, QueryRunner } from "typeorm";

export class Migartions1762620207366 implements MigrationInterface {
    name = 'Migartions1762620207366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card_parts\` CHANGE \`selled_price\` \`sold_price\` double NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card_parts\` CHANGE \`sold_price\` \`selled_price\` double NULL`);
    }

}
