import Id from "../../../@shared/domain/entity/value-object/id.value-object";
import Client from "../../domain/client.entity";
import ClientGateway from "../../gateway/client.gateway";
import {
  AddClientInputDto,
  AddClientOutputDto,
} from "./add-client.usecase.dto";

export default class AddClientUseCase {
  private _clientRepository: ClientGateway;

  constructor(clientRepository: ClientGateway) {
    this._clientRepository = clientRepository;
  }

  async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {
    const props = {
      id: new Id(input.id) || new Id(),
      name: input.name,
      email: input.email,
      document: input.document,
      street: input.street,
      number: input.number,
      complement: input.complement,
      state: input.state,
      city: input.city,
      zipcode: input.zipcode,
    };

    const client = new Client(props);
    this._clientRepository.add(client);

    return {
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
      updatedAt: client.updatedAt,
    };
  }
}