import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";
  
@Table({
    tableName: "invoices_items",
    timestamps: false,
})

export class InvoiceItemModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;
  
    @ForeignKey(() => InvoiceModel)
    @Column({ allowNull: false })
    declare invoice_id: string;
  
    @BelongsTo(() => InvoiceModel)
    invoice: InvoiceModel[];
  
    @Column({ allowNull: false })
    declare name: string;
  
    @Column({ allowNull: false })
    declare price: number;
}