import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for client", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a client",async () => {
        const response = await request(app)
            .post("/clients")
            .send({
                name: "Client 1",
                email: "x@x.com",
                document: "312331",
                street: "Street",
                number: "133",
                complement: "Complement",
                state: "SP",
                city: "Sao Paulo",
                zipcode: "09820-000"
            });
        
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Client 1");
        expect(response.body.email).toBe("x@x.com");
        expect(response.body.document).toBe("312331");
        expect(response.body.street).toBe("Street");
        expect(response.body.number).toBe("133");
        expect(response.body.complement).toBe("Complement");
        expect(response.body.state).toBe("SP");
        expect(response.body.city).toBe("Sao Paulo");
        expect(response.body.zipcode).toBe("09820-000");
    })
});