import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1730747203910 implements MigrationInterface {
    name = 'FirstMigration1730747203910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`newCardProblems\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`description\` varchar(255) NOT NULL, \`newCardId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`newCardJobsWorker\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`workerAv\` varchar(255) NOT NULL, \`workerId\` int NOT NULL, \`newCardJobId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`newCardJobs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`code\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`av\` int NULL, \`price\` int NULL, \`discount\` int NOT NULL, \`oil\` varchar(255) NOT NULL, \`newCardId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`newCards\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`type\` varchar(255) NOT NULL, \`manufactured\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`sassi\` varchar(255) NOT NULL, \`carNumber\` varchar(255) NOT NULL, \`produceDate\` varchar(255) NOT NULL, \`km\` varchar(255) NOT NULL, \`qostNumber\` varchar(255) NOT NULL, \`paymentType\` varchar(255) NOT NULL, \`nds\` tinyint NOT NULL DEFAULT 0, \`repairAgain\` tinyint NOT NULL DEFAULT 0, \`servisInfo\` tinyint NOT NULL DEFAULT 0, \`comments\` varchar(255) NULL, \`recommendation\` varchar(255) NOT NULL DEFAULT 1, \`clientId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`clients\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`companyName\` varchar(255) NOT NULL, \`companyRepresentative\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`requisite\` varchar(255) NOT NULL, \`voen\` varchar(255) NOT NULL, \`contractNumber\` varchar(255) NOT NULL, \`contractDate\` varchar(255) NOT NULL, \`approver\` varchar(255) NOT NULL, \`oneCCode\` varchar(255) NULL, \`type\` varchar(255) NOT NULL DEFAULT 'customer', \`typeOfStatus\` varchar(255) NOT NULL DEFAULT 'phisical', \`av\` int NULL, \`partsDiscount\` int NULL, \`userId\` int NOT NULL, UNIQUE INDEX \`IDX_c31234694811c83541603176b1\` (\`companyName\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userName\` varchar(255) NOT NULL, \`firstName\` varchar(255) NULL, \`lastName\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`userRole\` varchar(255) NOT NULL DEFAULT 'ServiceUser', \`password\` varchar(255) NOT NULL, \`workerIdId\` int NULL, UNIQUE INDEX \`IDX_226bb9aa7aa8a69991209d58f5\` (\`userName\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`REL_a27d711f098cb1a7a7b7ac6f5b\` (\`workerIdId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`suppliers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`supplier\` varchar(255) NOT NULL, \`country\` varchar(255) NULL, \`contact_person\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`paymnet_type\` varchar(255) NOT NULL, \`deliver_type\` varchar(255) NOT NULL, \`deliver_period\` varchar(255) NOT NULL, \`credit_line\` varchar(255) NULL, \`credit_note\` varchar(255) NULL, \`credit_duration\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`warehouse_parts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`code\` varchar(255) NOT NULL, \`origCode\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`liquidity\` varchar(255) NOT NULL, \`count\` int NOT NULL, \`price\` int NOT NULL, \`sell_price\` int NOT NULL, \`warehouseId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`warehouses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`invoice\` varchar(255) NOT NULL, \`market\` varchar(255) NOT NULL, \`paymentType\` varchar(255) NOT NULL, \`comment\` varchar(255) NOT NULL, \`message\` varchar(255) NULL, \`brandId\` int NULL, UNIQUE INDEX \`REL_b06d67075e6d82acc5f02b5883\` (\`brandId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`brands\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_96db6bbbaa6f23cad26871339b\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`new_card_problems_service_workers_users\` (\`newCardProblemsId\` int NOT NULL, \`usersId\` int NOT NULL, INDEX \`IDX_53214fc43aaed5274cc0422a8e\` (\`newCardProblemsId\`), INDEX \`IDX_258c2269bb5f958d82f4b66f5f\` (\`usersId\`), PRIMARY KEY (\`newCardProblemsId\`, \`usersId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`newCardProblems\` ADD CONSTRAINT \`FK_ff2179df34db64dba9ec4de8dab\` FOREIGN KEY (\`newCardId\`) REFERENCES \`newCards\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`newCardJobsWorker\` ADD CONSTRAINT \`FK_bc4d8489c51dc109c3e3f79773b\` FOREIGN KEY (\`newCardJobId\`) REFERENCES \`newCardJobs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`newCardJobs\` ADD CONSTRAINT \`FK_70ab80fa526191d7fd738164386\` FOREIGN KEY (\`newCardId\`) REFERENCES \`newCards\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`newCards\` ADD CONSTRAINT \`FK_7d000da24ee722bcd38c001b20c\` FOREIGN KEY (\`clientId\`) REFERENCES \`clients\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`clients\` ADD CONSTRAINT \`FK_59c1e5e51addd6ebebf76230b37\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_a27d711f098cb1a7a7b7ac6f5b2\` FOREIGN KEY (\`workerIdId\`) REFERENCES \`newCardJobsWorker\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`warehouse_parts\` ADD CONSTRAINT \`FK_59e6c70580b1cdcedbc4a09d0b4\` FOREIGN KEY (\`warehouseId\`) REFERENCES \`warehouses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`warehouses\` ADD CONSTRAINT \`FK_b06d67075e6d82acc5f02b58839\` FOREIGN KEY (\`brandId\`) REFERENCES \`brands\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`new_card_problems_service_workers_users\` ADD CONSTRAINT \`FK_53214fc43aaed5274cc0422a8e1\` FOREIGN KEY (\`newCardProblemsId\`) REFERENCES \`newCardProblems\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`new_card_problems_service_workers_users\` ADD CONSTRAINT \`FK_258c2269bb5f958d82f4b66f5fc\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`new_card_problems_service_workers_users\` DROP FOREIGN KEY \`FK_258c2269bb5f958d82f4b66f5fc\``);
        await queryRunner.query(`ALTER TABLE \`new_card_problems_service_workers_users\` DROP FOREIGN KEY \`FK_53214fc43aaed5274cc0422a8e1\``);
        await queryRunner.query(`ALTER TABLE \`warehouses\` DROP FOREIGN KEY \`FK_b06d67075e6d82acc5f02b58839\``);
        await queryRunner.query(`ALTER TABLE \`warehouse_parts\` DROP FOREIGN KEY \`FK_59e6c70580b1cdcedbc4a09d0b4\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_a27d711f098cb1a7a7b7ac6f5b2\``);
        await queryRunner.query(`ALTER TABLE \`clients\` DROP FOREIGN KEY \`FK_59c1e5e51addd6ebebf76230b37\``);
        await queryRunner.query(`ALTER TABLE \`newCards\` DROP FOREIGN KEY \`FK_7d000da24ee722bcd38c001b20c\``);
        await queryRunner.query(`ALTER TABLE \`newCardJobs\` DROP FOREIGN KEY \`FK_70ab80fa526191d7fd738164386\``);
        await queryRunner.query(`ALTER TABLE \`newCardJobsWorker\` DROP FOREIGN KEY \`FK_bc4d8489c51dc109c3e3f79773b\``);
        await queryRunner.query(`ALTER TABLE \`newCardProblems\` DROP FOREIGN KEY \`FK_ff2179df34db64dba9ec4de8dab\``);
        await queryRunner.query(`DROP INDEX \`IDX_258c2269bb5f958d82f4b66f5f\` ON \`new_card_problems_service_workers_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_53214fc43aaed5274cc0422a8e\` ON \`new_card_problems_service_workers_users\``);
        await queryRunner.query(`DROP TABLE \`new_card_problems_service_workers_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_96db6bbbaa6f23cad26871339b\` ON \`brands\``);
        await queryRunner.query(`DROP TABLE \`brands\``);
        await queryRunner.query(`DROP INDEX \`REL_b06d67075e6d82acc5f02b5883\` ON \`warehouses\``);
        await queryRunner.query(`DROP TABLE \`warehouses\``);
        await queryRunner.query(`DROP TABLE \`warehouse_parts\``);
        await queryRunner.query(`DROP TABLE \`suppliers\``);
        await queryRunner.query(`DROP INDEX \`REL_a27d711f098cb1a7a7b7ac6f5b\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_226bb9aa7aa8a69991209d58f5\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_c31234694811c83541603176b1\` ON \`clients\``);
        await queryRunner.query(`DROP TABLE \`clients\``);
        await queryRunner.query(`DROP TABLE \`newCards\``);
        await queryRunner.query(`DROP TABLE \`newCardJobs\``);
        await queryRunner.query(`DROP TABLE \`newCardJobsWorker\``);
        await queryRunner.query(`DROP TABLE \`newCardProblems\``);
    }

}
