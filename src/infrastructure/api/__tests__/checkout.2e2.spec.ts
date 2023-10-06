import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/client-adm.facade.factory";
import { InvoiceModel } from "../../../modules/invoice/repository/invoice.model";
import { InvoiceItemModel } from "../../../modules/invoice/repository/item.model";
import TransactionModel from "../../../modules/payment/repository/transaction.model";
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";
import { ProductModel } from "../../../modules/product-adm/repository/product.model";
import StoreCatalogFacadeFactory from "../../../modules/store-catalog/factory/facade.factory";
import ProductStoreModel from "../../../modules/store-catalog/repository/product.model";
import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for checkout", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});

        await sequelize.addModels([ProductModel, ProductStoreModel, InvoiceModel, InvoiceItemModel, TransactionModel]);
        await sequelize.sync();
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("Checkout",async () => {
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
        const input = {
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 100,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    
        await productFacade.addProduct(input);
       
        const storeCatalogFacade = StoreCatalogFacadeFactory.create();
        await ProductStoreModel.create({
            id: "1",
            name: "Product 1",
            description: "Description 1",
            salesPrice: 100,
        });
        const product = await storeCatalogFacade.find({id: "1"});

        /*
        const invoiceFacade = InvoiceFacadeFactory.create();
        const inputInvoice = {
            id: "1i",
            name: client.name,
            document: client.document,
            street: client.street,
            number: client.number,
            complement: client.complement,
            city: client.city,
            state: client.state,
            zipCode: client.zipcode,
            items: [
                {
                    id: '1t',
                    name: product.name,
                    price: product.salesPrice,
                },
            ],
        };
        
        await invoiceFacade.create(inputInvoice);
        const invoice = await invoiceFacade.find({ id: "1i" });

        const paymentFacade = PaymentFacadeFactory.create();
        const inputPayment = {
            transactionId: "1t",
            orderId: "order-1",
            amount: 100,
            status: "approved",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await paymentFacade.process(inputPayment);
        */

        const response = await request(app)
            .post("/checkout")
            .send({
                clientId: client.id,
                products: [{ productId: product.id}]
        });

        expect(response.status).toBe(200);
        expect(response.body.id).toBeDefined()
        expect(response.body.products.length).toBe(1)
        expect(response.body.products[0].productId).toBe(product.id)
        expect(response.body.total).toBe(100)


    });

});
