import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "../repository/invoice.model";
import { InvoiceItemModel } from "../repository/item.model";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";


describe("InvoiceFacade test", () => {
    let sequelize: Sequelize;
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      await sequelize.addModels([InvoiceModel, InvoiceItemModel]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });

    it("should create a new invoice", async () => {
      const facade = InvoiceFacadeFactory.create();
  
        const input = {
            id: "2",
            name: "Invoice Test",
            document: "12345678901",
            street: "Rua Test",
            number: "123",
            complement: "complement",
            city: "Test",
            state: "Test",
            zipCode: "12345678",
            items: [
                {
                id: "1",
                name: "Test 1",
                price: 10,
                },
                {
                id: "2",
                name: "Test 2",
                price: 20,
                },
            ],
        };
        
        await facade.create(input);
  
        const invoice = await facade.find({ id: "2" });

        expect(invoice).toBeDefined();
        expect(invoice.id).toBeDefined();
        expect(invoice.name).toEqual(input.name);
        expect(invoice.document).toEqual(input.document);
        expect(invoice.address.city).toEqual(input.city);
        expect(invoice.address.number).toEqual(input.number);
        expect(invoice.address.complement).toEqual(input.complement);        
        expect(invoice.address.state).toEqual(input.state);
        expect(invoice.address.street).toEqual(input.street);
        expect(invoice.total).toBe(30);

        expect(invoice.items.length).toBe(2);
        expect(invoice.items[0].id).toEqual("1");
        expect(invoice.items[0].name).toEqual("Test 1");
        expect(invoice.items[0].price).toBe(10);

        expect(invoice.items[1].id).toEqual("2");
        expect(invoice.items[1].name).toEqual("Test 2");
        expect(invoice.items[1].price).toBe(20);
    
    });

  it("should find a invoice", async ()=>{
    const facade = InvoiceFacadeFactory.create();
  
    const  input = {
      id: "1",
      name: "Invoice Test",
      document: "12345678901",
      street: "Rua Test",
      number: "123",
      complement: "complement",
      city: "Test",
      state: "Test",
      zipCode: "12345678",
      items: [
          {
          id: "1",
          name: "Product 1",
          price: 10,
          },
          {
          id: "2",
          name: "Product 2",
          price: 20,
          },
      ],
  };
  
    await facade.create(input);

    const invoice = await facade.find({ id: "1" });

    expect(invoice).toBeDefined();
    expect(invoice.id).toBeDefined();
    expect(invoice.name).toEqual(input.name);
    expect(invoice.address.city).toEqual(input.city);
    expect(invoice.address.complement).toEqual(input.complement);
    expect(invoice.document).toEqual(input.document);
    expect(invoice.address.number).toEqual(input.number);
    expect(invoice.address.state).toEqual(input.state);
    expect(invoice.address.street).toEqual(input.street);
    expect(invoice.total).toBe(30);

    expect(invoice.items.length).toBe(2);
    expect(invoice.items[0].id).toEqual("1");
    expect(invoice.items[0].name).toEqual("Product 1");
    expect(invoice.items[0].price).toBe(10);

    expect(invoice.items[1].id).toEqual("2");
    expect(invoice.items[1].name).toEqual("Product 2");
    expect(invoice.items[1].price).toBe(20);

  });

});