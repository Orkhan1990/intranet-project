import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateUserTableMigration1728834196620 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name:"users",
                columns:[
                    {
                        name:"id",
                        type:"int",
                        isPrimary:true,
                        isGenerated:true
                    },
                    {
                        name:"userName",
                        type:"varchar",
                        length:"250",
                        isNullable:false,
                        isUnique:true
                    },
                    {
                        name:"email",
                        type:"varchar",
                        length:"250",
                        isNullable:false,
                        isUnique:true
                    },

                    {
                        name:"lastName",
                        type:"varchar",
                        length:"250",
                        isNullable:true
                    },
                    {
                        name:"firstName",
                        type:"varchar",
                        length:"250",
                        isNullable:true
                    },
                    {
                        name:"password",
                        type:"varchar",
                        length:"250",
                        isNullable:false
                    },
                    {
                        name:"createdAt",
                        type:"timestamp",
                        default:"now()"
                    },
                    {
                        name:"updatedAt",
                        type:"timestamp",
                        default:"now()"
                    }
                ]
            })
        )

        await queryRunner.createTable(
            new Table({
                name:"clients",
                columns:[
                    {
                        name:"id",
                        type:"int",
                        isPrimary:true,
                        isGenerated:true
                    },
                    {
                        name:"companyName",
                        type:"varchar",
                        length:"250",
                        isUnique:true,
                        isNullable:false
                    },
                    {
                        name:"companyRepresentative",
                        type:"varchar",
                        length:"250",
                        isNullable:false
                    },
                    {
                        name:"phoneNumber",
                        type:"varchar",
                        length:"250",
                        isNullable:false
                    },
                    {
                        name:"email",
                        type:"varchar",
                        length:"250",
                        isNullable:false
                    },
                    {
                        name:"address",
                        type:"varchar",
                        length:"250",
                        isNullable:false
                    },
                    {
                        name:"requisite",
                        type:"varchar",
                        length:"250",
                        isNullable:false
                    },
                    {
                        name:"voen",
                        type:"varchar",
                        length:"250",
                        isNullable:false
                    },
                    {
                        name:"contractNumber",
                        type:"varchar",
                        length:"250",
                        isNullable:false
                    },
                    {
                        name:"contractDate",
                        type:"varchar",
                        length:"250",
                        isNullable:false
                    },
                    {
                        name:"approver",
                        type:"varchar",
                        length:"250",
                        isNullable:false
                    },
                    {
                        name:"oneCCode",
                        type:"varchar",
                        length:"250",
                        isNullable:true
                    },
                    {
                        name:"type",
                        type:"varchar",
                        length:"250",
                        default:"customer"
                    },
                    {
                        name:"typeOfStatus",
                        type:"varchar",
                        length:"250",
                        default:"phisical"
                    },
                    {
                        name:"av",
                        type:"int",
                        isNullable:true
                    },
                    {
                        name:"partsDiscount",
                        type:"int",
                        isNullable:true
                    },
                    {
                        name:"userId",
                        type:"int"
                    }
                ]
            })
        );

        await queryRunner.createForeignKey(
            "clients",
            new TableForeignKey({
                columnNames:["userId"],
                referencedColumnNames:["id"],
                referencedTableName:"users",
                onDelete:"CASCADE"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        const table=await queryRunner.getTable("clients");
        const foreingKey=table.foreignKeys.find(fk=>fk.columnNames.indexOf("userId")!==-1);
        await queryRunner.dropForeignKey("clients",foreingKey);
        await queryRunner.dropTable("clients");
        await queryRunner.dropTable("users");
    }

}
