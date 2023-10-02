import InvoiceFacade from "../facade/invoice.facade";
import InvoiceFacadeInterface from "../facade/invoice.facade.interface";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUseCase from "../usecase/find/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate/generate-invoice.usecase";

export default class InvoiceFacadeFactory {
    static create(): InvoiceFacadeInterface {
      const repository = new InvoiceRepository();
      const generateUseCase = new GenerateInvoiceUseCase(repository);
      const findUseCase = new FindInvoiceUseCase(repository);
      const facade = new InvoiceFacade({
        generateUsecase: generateUseCase,
        findUsecase: findUseCase,
      });
  
      return facade;
  
    }
  }