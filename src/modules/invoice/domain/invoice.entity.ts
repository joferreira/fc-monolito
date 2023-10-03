import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/entity/value-object/id.value-object";
import Address from "./address.value-object";
import Product from "./invoiceItems.entity";

type InvoiceProps = {
    id?: Id;
    name: string;
    document: string;
    address: Address;
    items: Product[];
    createdAt?: Date;
    updatedAt?: Date;
}

export default class Invoice extends BaseEntity {
    private _name: string;
    private _document: string;
    private _address: Address;
    private _items: Product[];

    constructor (props: InvoiceProps){
        super(props.id, props.createdAt, props.updatedAt);
        this._name = props.name;
        this._document = props.document;
        this._address = props.address;
        this._items = props.items;
    }

    get name(): string{
        return this._name;
    }

    get document(): string{
        return this._document;
    }

    get address(): Address{
        return this._address;
    }

    get items(): Product[]{
        return this._items;
    }

    get total(): number{
        return this._items.reduce((total, item) => {
            return total + item.price;
        }, 0);
    }

}