import Id from "../../../@shared/domain/entity/value-object/id.value-object";
import Address from "../../domain/address.value-object";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/invoiceItems.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceInputDto, GenerateInvoiceOutputDto } from "./generate-invoice.usecase.dto";

export default class GenerateInvoiceUseCase {
    private _invoiceRepository: InvoiceGateway;

  constructor(invoiceRepository: InvoiceGateway) {
    this._invoiceRepository = invoiceRepository;
  }

  async execute(input: GenerateInvoiceInputDto): Promise<GenerateInvoiceOutputDto> {
    const props = {
        id: new Id(input.id) || new Id(),
        name: input.name,
        document: input.document,
        address: new Address({
          street: input.street,
          number: input.number,
          complement: input.complement,
          city: input.city,
          state:input.state,
          zipCode: input.zipCode,
        }),
        items: input.items.map((item) => new Product({
            id: new Id(item.id),
            name: item.name,
            price: item.price,
        }))
    }

    const invoice = new Invoice(props);
    await this._invoiceRepository.generate(invoice);

    return {
        id: invoice.id.id,
        name: invoice.name,
        document: invoice.document,
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state:invoice.address.state,
        zipCode: invoice.address.zipCode,
        items:invoice.items.map((item) =>({
            id: item.id.id,
            name: item.name,
            price: item.price,
        })),
        total: invoice.total,
    };
  }
}
