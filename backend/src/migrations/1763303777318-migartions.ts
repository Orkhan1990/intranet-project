import { MigrationInterface, QueryRunner } from "typeorm";

export class Migartions1763303777318 implements MigrationInterface {
    name = 'Migartions1763303777318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`clients\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`clients\` ADD CONSTRAINT \`FK_59c1e5e51addd6ebebf76230b37\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`card_problem_workers\` ADD CONSTRAINT \`FK_bd40915ab12cd806ca91fbe154e\` FOREIGN KEY (\`problem_id\`) REFERENCES \`card_problems\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`card_problem_workers\` ADD CONSTRAINT \`FK_598f07fa0caddcfd3c43e1bca7f\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card_problem_workers\` DROP FOREIGN KEY \`FK_598f07fa0caddcfd3c43e1bca7f\``);
        await queryRunner.query(`ALTER TABLE \`card_problem_workers\` DROP FOREIGN KEY \`FK_bd40915ab12cd806ca91fbe154e\``);
        await queryRunner.query(`ALTER TABLE \`clients\` DROP FOREIGN KEY \`FK_59c1e5e51addd6ebebf76230b37\``);
        await queryRunner.query(`ALTER TABLE \`clients\` CHANGE \`userId\` \`userId\` int NOT NULL`);
    }

}
