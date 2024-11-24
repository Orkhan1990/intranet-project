import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1732477604904 implements MigrationInterface {
    name = 'FirstMigration1732477604904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`card_problems\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`description\` varchar(255) NOT NULL, \`cardId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`card_worker_jobs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`workerAv\` varchar(255) NOT NULL, \`workerId\` int NOT NULL, \`cardJobId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`card_jobs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`code\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`av\` int NULL, \`price\` int NULL, \`discount\` int NOT NULL, \`oil\` varchar(255) NOT NULL, \`cardId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cards\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`type\` varchar(255) NOT NULL, \`manufactured\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`sassi\` varchar(255) NOT NULL, \`carNumber\` varchar(255) NOT NULL, \`produceDate\` varchar(255) NOT NULL, \`km\` varchar(255) NOT NULL, \`qostNumber\` varchar(255) NOT NULL, \`paymentType\` varchar(255) NOT NULL, \`nds\` tinyint NOT NULL DEFAULT 0, \`repairAgain\` tinyint NOT NULL DEFAULT 0, \`servisInfo\` tinyint NOT NULL DEFAULT 0, \`comments\` varchar(255) NULL, \`recommendation\` varchar(255) NOT NULL DEFAULT 1, \`clientId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order_parts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`part_number\` varchar(255) NOT NULL, \`count\` int NOT NULL, \`part_name\` varchar(255) NOT NULL, \`orderId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`orders\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`project\` varchar(255) NULL, \`card_number\` varchar(255) NULL, \`order_type\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`chassis_number\` varchar(255) NOT NULL, \`engine_number\` varchar(255) NOT NULL, \`produce_year\` varchar(255) NOT NULL, \`km\` varchar(255) NOT NULL, \`vehicle_number\` varchar(255) NOT NULL, \`payment_type\` varchar(255) NOT NULL, \`delivering\` varchar(255) NOT NULL, \`delivering_type\` varchar(255) NOT NULL, \`initial_payment\` varchar(255) NOT NULL, \`comment\` varchar(255) NOT NULL, \`oil\` tinyint NOT NULL, \`clientsId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`clients\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`companyName\` varchar(255) NOT NULL, \`companyRepresentative\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`requisite\` varchar(255) NOT NULL, \`voen\` varchar(255) NOT NULL, \`contractNumber\` varchar(255) NOT NULL, \`contractDate\` varchar(255) NOT NULL, \`approver\` varchar(255) NOT NULL, \`oneCCode\` varchar(255) NULL, \`type\` varchar(255) NOT NULL DEFAULT 'customer', \`typeOfStatus\` varchar(255) NOT NULL DEFAULT 'phisical', \`av\` int NULL, \`partsDiscount\` int NULL, \`userId\` int NOT NULL, UNIQUE INDEX \`IDX_c31234694811c83541603176b1\` (\`companyName\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`brands\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_96db6bbbaa6f23cad26871339b\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`spare_parts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`code\` varchar(255) NOT NULL, \`origCode\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`liquidity\` varchar(255) NOT NULL, \`count\` int NOT NULL, \`price\` int NOT NULL, \`sell_price\` int NOT NULL, \`barcode\` varchar(255) NULL, \`row\` varchar(255) NULL, \`column\` varchar(255) NULL, \`brandId\` int NULL, \`invoiceId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`suppliers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`supplier\` varchar(255) NOT NULL, \`country\` varchar(255) NULL, \`contact_person\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`paymnet_type\` varchar(255) NOT NULL, \`deliver_type\` varchar(255) NOT NULL, \`deliver_period\` varchar(255) NOT NULL, \`credit_line\` varchar(255) NULL, \`credit_note\` varchar(255) NULL, \`credit_duration\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`invoices\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`requestId\` varchar(255) NOT NULL, \`invoice\` varchar(255) NOT NULL, \`market\` varchar(255) NOT NULL, \`paymentType\` varchar(255) NOT NULL, \`comment\` varchar(255) NOT NULL, \`message\` varchar(255) NULL, \`supplierId\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userName\` varchar(255) NOT NULL, \`firstName\` varchar(255) NULL, \`lastName\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`userRole\` varchar(255) NOT NULL DEFAULT 'ServiceUser', \`password\` varchar(255) NOT NULL, \`cardWorkerJobId\` int NULL, UNIQUE INDEX \`IDX_226bb9aa7aa8a69991209d58f5\` (\`userName\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`REL_0c3f075afca9bec9e0d7250eed\` (\`cardWorkerJobId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`card_problems_service_workers_users\` (\`cardProblemsId\` int NOT NULL, \`usersId\` int NOT NULL, INDEX \`IDX_6f4898d8b20cb35d8cb3ed6f53\` (\`cardProblemsId\`), INDEX \`IDX_8c18d1f1bc831b1ef5289a5e20\` (\`usersId\`), PRIMARY KEY (\`cardProblemsId\`, \`usersId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`card_problems\` ADD CONSTRAINT \`FK_ec13c3b3e2a76c49c6c6d73c758\` FOREIGN KEY (\`cardId\`) REFERENCES \`cards\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`card_worker_jobs\` ADD CONSTRAINT \`FK_9305eb330e073c24c26fae46dcb\` FOREIGN KEY (\`cardJobId\`) REFERENCES \`card_jobs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`card_jobs\` ADD CONSTRAINT \`FK_b1ad2226066f54b039e8824f6a3\` FOREIGN KEY (\`cardId\`) REFERENCES \`cards\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD CONSTRAINT \`FK_9d6a637355d325d4006f82be27b\` FOREIGN KEY (\`clientId\`) REFERENCES \`clients\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_parts\` ADD CONSTRAINT \`FK_790f388a94f5ffc752754e3d0f8\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_f25af0b3ffd89c7431f167bad20\` FOREIGN KEY (\`clientsId\`) REFERENCES \`clients\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`clients\` ADD CONSTRAINT \`FK_59c1e5e51addd6ebebf76230b37\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`spare_parts\` ADD CONSTRAINT \`FK_695d5b74e86e87db5e6088a38bf\` FOREIGN KEY (\`brandId\`) REFERENCES \`brands\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`spare_parts\` ADD CONSTRAINT \`FK_da1b03510c56a749a0ba566f5aa\` FOREIGN KEY (\`invoiceId\`) REFERENCES \`invoices\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`invoices\` ADD CONSTRAINT \`FK_0cf9a7d463c3262c954f3300fe9\` FOREIGN KEY (\`supplierId\`) REFERENCES \`suppliers\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`invoices\` ADD CONSTRAINT \`FK_fcbe490dc37a1abf68f19c5ccb9\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_0c3f075afca9bec9e0d7250eeda\` FOREIGN KEY (\`cardWorkerJobId\`) REFERENCES \`card_worker_jobs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`card_problems_service_workers_users\` ADD CONSTRAINT \`FK_6f4898d8b20cb35d8cb3ed6f532\` FOREIGN KEY (\`cardProblemsId\`) REFERENCES \`card_problems\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`card_problems_service_workers_users\` ADD CONSTRAINT \`FK_8c18d1f1bc831b1ef5289a5e20e\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card_problems_service_workers_users\` DROP FOREIGN KEY \`FK_8c18d1f1bc831b1ef5289a5e20e\``);
        await queryRunner.query(`ALTER TABLE \`card_problems_service_workers_users\` DROP FOREIGN KEY \`FK_6f4898d8b20cb35d8cb3ed6f532\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_0c3f075afca9bec9e0d7250eeda\``);
        await queryRunner.query(`ALTER TABLE \`invoices\` DROP FOREIGN KEY \`FK_fcbe490dc37a1abf68f19c5ccb9\``);
        await queryRunner.query(`ALTER TABLE \`invoices\` DROP FOREIGN KEY \`FK_0cf9a7d463c3262c954f3300fe9\``);
        await queryRunner.query(`ALTER TABLE \`spare_parts\` DROP FOREIGN KEY \`FK_da1b03510c56a749a0ba566f5aa\``);
        await queryRunner.query(`ALTER TABLE \`spare_parts\` DROP FOREIGN KEY \`FK_695d5b74e86e87db5e6088a38bf\``);
        await queryRunner.query(`ALTER TABLE \`clients\` DROP FOREIGN KEY \`FK_59c1e5e51addd6ebebf76230b37\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_f25af0b3ffd89c7431f167bad20\``);
        await queryRunner.query(`ALTER TABLE \`order_parts\` DROP FOREIGN KEY \`FK_790f388a94f5ffc752754e3d0f8\``);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP FOREIGN KEY \`FK_9d6a637355d325d4006f82be27b\``);
        await queryRunner.query(`ALTER TABLE \`card_jobs\` DROP FOREIGN KEY \`FK_b1ad2226066f54b039e8824f6a3\``);
        await queryRunner.query(`ALTER TABLE \`card_worker_jobs\` DROP FOREIGN KEY \`FK_9305eb330e073c24c26fae46dcb\``);
        await queryRunner.query(`ALTER TABLE \`card_problems\` DROP FOREIGN KEY \`FK_ec13c3b3e2a76c49c6c6d73c758\``);
        await queryRunner.query(`DROP INDEX \`IDX_8c18d1f1bc831b1ef5289a5e20\` ON \`card_problems_service_workers_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_6f4898d8b20cb35d8cb3ed6f53\` ON \`card_problems_service_workers_users\``);
        await queryRunner.query(`DROP TABLE \`card_problems_service_workers_users\``);
        await queryRunner.query(`DROP INDEX \`REL_0c3f075afca9bec9e0d7250eed\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_226bb9aa7aa8a69991209d58f5\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`invoices\``);
        await queryRunner.query(`DROP TABLE \`suppliers\``);
        await queryRunner.query(`DROP TABLE \`spare_parts\``);
        await queryRunner.query(`DROP INDEX \`IDX_96db6bbbaa6f23cad26871339b\` ON \`brands\``);
        await queryRunner.query(`DROP TABLE \`brands\``);
        await queryRunner.query(`DROP INDEX \`IDX_c31234694811c83541603176b1\` ON \`clients\``);
        await queryRunner.query(`DROP TABLE \`clients\``);
        await queryRunner.query(`DROP TABLE \`orders\``);
        await queryRunner.query(`DROP TABLE \`order_parts\``);
        await queryRunner.query(`DROP TABLE \`cards\``);
        await queryRunner.query(`DROP TABLE \`card_jobs\``);
        await queryRunner.query(`DROP TABLE \`card_worker_jobs\``);
        await queryRunner.query(`DROP TABLE \`card_problems\``);
    }

}
