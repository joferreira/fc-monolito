import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/entity/value-object/id.value-object"

type ClientProps = {
    id?: Id;
    name: string;
    email: string;
    document: string;
    street: string;
    number: string;
    complement: string;
    state: string;
    city: string;
    zipcode: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export default class Client extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _email: string;
    private _document: string;
    private _street: string;
    private _number: string;
    private _complement: string;
    private _state: string;
    private _city: string;
    private _zipcode: string;

    constructor(props: ClientProps){
        super(props.id, props.createdAt, props.updatedAt);
        this._name = props.name;
        this._email = props.email;
        this._document = props.document;
        this._street = props.street;
        this._number = props.number;
        this._complement = props.complement;
        this._state = props.state;
        this._city = props.city;
        this._zipcode = props.zipcode;
    }

    get name(): string{
        return this._name;
    }

    get email(): string{
        return this._email;
    }

    get document(): string {
        return this._document;
    }

    get street(): string{
        return this._street;
    }

    get number(): string{
        return this._number;
    }

    get complement(): string {
        return this._complement;
    }

    get state(): string{
        return this._state;
    }

    get city(): string{
        return this._city;
    }

    get zipcode(): string {
        return this._zipcode;
    }

}