import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/entity/value-object/id.value-object";
import Client from "../domain/client.entity";
import { ClientModel } from "./client.model";
import ClientRepository from "./client.repository";

describe("ClientRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const client = new Client({
      id: new Id("1"),
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

    const repository = new ClientRepository();
    await repository.add(client);

    const clientDb = await ClientModel.findOne({ where: { id: "1" } });

    expect(clientDb).toBeDefined();
    expect(clientDb.id).toBe(client.id.id);
    expect(clientDb.name).toBe(client.name);
    expect(clientDb.email).toBe(client.email);
    expect(clientDb.document).toBe(client.document);
    expect(clientDb.street).toBe(client.street);
    expect(clientDb.number).toBe(client.number);
    expect(clientDb.complement).toBe(client.complement);
    expect(clientDb.state).toBe(client.state);
    expect(clientDb.city).toBe(client.city);
    expect(clientDb.zipcode).toBe(client.zipcode);
    expect(clientDb.createdAt).toStrictEqual(client.createdAt);
    expect(clientDb.updatedAt).toStrictEqual(client.updatedAt);
  });

  it("should find a client", async () => {
    const client = await ClientModel.create({
      id: "2",
      name: "Client 2",
      email: "x@x.com",
      document: "312331",
      street: "Street",
      number: "133",
      complement: "Complement",
      state: "SP",
      city: "Sao Paulo",
      zipcode: "09820-000",
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const repository = new ClientRepository();
    const result = await repository.find(client.id);

    expect(result.id.id).toEqual(client.id);
    expect(result.name).toEqual(client.name);
    expect(result.email).toEqual(client.email);
    expect(result.document).toEqual(client.document);
    expect(result.street).toEqual(client.street);
    expect(result.number).toEqual(client.number);
    expect(result.complement).toEqual(client.complement);
    expect(result.state).toEqual(client.state);
    expect(result.city).toEqual(client.city);
    expect(result.zipcode).toEqual(client.zipcode);
    expect(result.createdAt).toStrictEqual(client.createdAt);
    expect(result.updatedAt).toStrictEqual(client.updatedAt);
  });
});