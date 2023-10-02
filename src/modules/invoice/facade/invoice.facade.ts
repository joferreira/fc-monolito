import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import { FindInvoiceInputDto } from "../usecase/find/find-invoice.usecase.dto";
import InvoiceFacadeInterface, { FindInvoiceFacadeOutputDto, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./invoice.facade.interface";

export interface UseCaseProps {
  findUsecase: UseCaseInterface;
  generateUsecase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
  private _findUsecase: UseCaseInterface;
  private _generateUsecase: UseCaseInterface;

  constructor(usecaseProps: UseCaseProps) {
    this._findUsecase = usecaseProps.findUsecase;
    this._generateUsecase = usecaseProps.generateUsecase;
  }

  async create(
    invoice: GenerateInvoiceFacadeInputDto
  ): Promise<GenerateInvoiceFacadeOutputDto> {
    return await this._generateUsecase.execute(invoice);
  }

  async find(input: FindInvoiceInputDto): Promise<FindInvoiceFacadeOutputDto> {
    return await this._findUsecase.execute(input);
  }
}
