import Id from "../../@shared/domain/entity/value-object/id.value-object";
import clientEntity from "../domain/client.entity";
import ClientGateway from "../gateway/client.gateway";
import { ClientModel } from "./client.model";

export default class ClientRepository implements ClientGateway {
  async add(client: clientEntity): Promise<void> {
    await ClientModel.create({
      id: client.id.id,
      name: client.name,
      email: client.email,
      document: client.document,
      street: client.street,
      number: client.number,
      complement: client.complement,
      state: client.state,
      city: client.city,
      zipcode: client.zipcode,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt
    });
  }
  async find(id: string): Promise<clientEntity> {
    const client = await ClientModel.findOne({ where: { id } });

    if (!client) {
      throw new Error("Client not found");
    }

    return new clientEntity({
      id: new Id(client.id),
      name: client.name,
      email: client.email,
      document: client.document,
      street: client.street,
      number: client.number,
      complement: client.complement,
      state: client.state,
      city: client.city,
      zipcode: client.zipcode,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    });
  }
}