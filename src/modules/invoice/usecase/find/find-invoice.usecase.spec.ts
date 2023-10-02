import Id from "../../../@shared/domain/entity/value-object/id.value-object";
import Address from "../../domain/address.value-object";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/invoiceItems.entity";
import FindInvoiceUseCase from "./find-invoice.usecase";

const productOne = new Product({
    id : new Id("1"),
    name: "Product 1",
    price: 700
});

const productTwo = new Product({
    id : new Id("2"),
    name: "Product 2",
    price: 750
});

const address = new Address({
    street: "street 2",
    number: "1313",
    complement: "complement",
    city: "Sao Paulo",
    state: "SP",
    zipCode: "12345"
});

const invoice = new Invoice({
    id: new Id("1"),
    name: "Invoice 1",
    document: "312341",
    address: address,
    items: [productOne,productTwo]
});

const MockRepository = () =>{
    return{
        generate: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(invoice))
    };
}

describe("Find invoice use case unit test",() => {
    it("should find a invoice", async ()=>{
        const repository = MockRepository();
        const useCase = new FindInvoiceUseCase(repository);

        const response = await useCase.execute({ id: "1"});

        expect(repository.find).toBeCalled()
        expect(response.id).toBeDefined;
        expect(response.name).toEqual(invoice.name);
        expect(response.address.city).toEqual(invoice.address.city);
        expect(response.address.complement).toEqual(invoice.address.complement);
        expect(response.document).toEqual(invoice.document);
        expect(response.address.number).toEqual(invoice.address.number);
        expect(response.address.state).toEqual(invoice.address.state);
        expect(response.address.street).toEqual(invoice.address.street);
        expect(response.total).toBe(1450);

        expect(response.items.length).toBe(2);
        expect(response.items[0].id).toEqual("1");
        expect(response.items[0].name).toEqual("Product 1");
        expect(response.items[0].price).toBe(700);

        expect(response.items[1].id).toEqual("2");
        expect(response.items[1].name).toEqual("Product 2");
        expect(response.items[1].price).toBe(750);

    });
});