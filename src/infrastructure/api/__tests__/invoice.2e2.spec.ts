import { Sequelize } from "sequelize-typescript";
import Id from "../../../modules/@shared/domain/entity/value-object/id.value-object";
import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/client-adm.facade.factory";
import { InvoiceModel } from "../../../modules/invoice/repository/invoice.model";
import InvoiceRepository from "../../../modules/invoice/repository/invoice.repository";
import { InvoiceItemModel } from "../../../modules/invoice/repository/item.model";
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../../modules/store-catalog/factory/facade.factory";
import ProductModel from "../../../modules/store-catalog/repository/product.model";
import { app } from "../express";
import request from "supertest";
import Product from "../../../modules/invoice/domain/invoiceItems.entity";
import Invoice from "../../../modules/invoice/domain/invoice.entity";
import Address from "../../../modules/invoice/domain/address.value-object";

describe("E2E test for invoice",() => {

    let sequelize: Sequelize;
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      await sequelize.addModels([ProductModel, InvoiceModel, InvoiceItemModel]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });

    it("should find a invoice", async ()=>{
        const clientFacade = ClientAdmFacadeFactory.create();
    
        const inputClient = {
            id: "1c",
            name: "Client 1",
            email: "x@x.com",
            document: "312331",
            street: "Street",
            number: "133",
            complement: "Complement",
            state: "SP",
            city: "Sao Paulo",
            zipcode: "09820-000"
        };  
        await clientFacade.add(inputClient);
        const client = await clientFacade.find({ id: "1c" });
        
        const productFacade = ProductAdmFacadeFactory.create();
        const inputProduct = {
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 100,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
        };    
        await productFacade.addProduct(inputProduct);

        const storeCatalogFacade = StoreCatalogFacadeFactory.create();
        await ProductModel.create({
            id: "1",
            name: "Product 1",
            description: "Description 1",
            salesPrice: 100,
        });
        const product = await storeCatalogFacade.find({id: "1"});

        const repository = new InvoiceRepository();

        const inputInvoice = new Invoice({
            id: new Id("1i"),
            name: client.name,
            document: client.document,
            address: new Address({
                street: client.street,
                number: client.number,
                complement: client.complement,
                city: client.city,
                state: client.state,
                zipCode: client.zipcode
            }),
            items: [
                new Product({
                    id: new Id(product.id),
                    name: product.name,
                    price: product.salesPrice,
                }),
            ]
        });

        await repository.generate(inputInvoice);

        const response = await request(app).get(`/invoice/${inputInvoice.id.id}`);

        expect(response.body.id).toBeDefined;
        expect(response.body.name).toEqual(inputInvoice.name);
        expect(response.body.document).toEqual(inputInvoice.document);
        expect(response.body.total).toBe(100);

        expect(response.body.items.length).toBe(1);
        expect(response.body.items[0].id).toEqual("1");
        expect(response.body.items[0].name).toEqual("Product 1");
        expect(response.body.items[0].price).toBe(100);

    });
});