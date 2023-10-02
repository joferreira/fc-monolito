import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const MockRepository = () =>{
    return{
        generate: jest.fn(),
        find: jest.fn(),
    }
}

describe("Invoice use case unit test",() => {
    it("should generate a invoice", async () =>{
        const repository = MockRepository();
        const usecase = new GenerateInvoiceUseCase(repository);

        const input = {
            name: "Jose",
            document: "12341",
            street: "Street 01",
            number: "1313",
            complement: "complement",
            city: "Sao Paulo",
            state: "SP",
            zipCode: "12351",
            items: [
                {
                    id: "1",
                    name:  "Product 1",
                    price: 500,  
                },
                {
                    id: "2",
                    name: "Product 2",
                    price: 550,  
                },
            ]
        }

        const result = await usecase.execute(input);

        expect(repository.generate).toBeCalled()
        expect(result.id).toBeDefined;
        expect(result.name).toEqual(input.name);
        expect(result.city).toEqual(input.city);
        expect(result.complement).toEqual(input.complement);
        expect(result.document).toEqual(input.document);
        expect(result.number).toEqual(input.number);
        expect(result.state).toEqual(input.state);
        expect(result.street).toEqual(input.street);
        expect(result.total).toBe(1050);

        expect(result.items.length).toBe(2);
        expect(result.items[0].id).toEqual("1");
        expect(result.items[0].name).toEqual("Product 1");
        expect(result.items[0].price).toBe(500);

        expect(result.items[1].id).toEqual("2");
        expect(result.items[1].name).toEqual("Product 2");
        expect(result.items[1].price).toBe(550);
    })
})