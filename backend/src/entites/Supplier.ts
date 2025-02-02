import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import { AllEntities } from './AllEntities';
import { Invoice} from './Invoice';
import { Order } from './Order';
import { SupplierOrderHistory } from './SuppliersOrderHistory';


@Entity({name:"suppliers"})
export class Supplier extends AllEntities{

    @Column({nullable:false})
    supplier:string;

    @Column({nullable:true})
    country: string;

    @Column({name:"contact_person",nullable:false})
    contactPerson:string;

    @Column({nullable:false})
    phone: string;

    @Column({nullable:false})
    email:string;

    @Column({name:"paymnet_type",nullable:false})
    paymentType: string;

    @Column({name:"deliver_type",nullable:false})
    deliverType: string;

    @Column({name:"deliver_period",nullable:false})
    deliverPeriod: string;

    @Column({name:"credit_line",nullable:true})
    creditLine: string;

    @Column({name:"credit_note",nullable:true})
    creditNote: string;

    @Column({name:"credit_duration",nullable:true})
    creditDuration: string;


    @OneToMany(() =>Invoice, (invoice) => invoice.supplier)
    invoices: Invoice[];
    
    // @ManyToMany(()=>Order,(order)=>order.suppliers)
    // orders:Order[];

     @OneToMany(()=>SupplierOrderHistory,(item)=>item.supplier)
     supplierOrderHistories:SupplierOrderHistory[];

}