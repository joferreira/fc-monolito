export interface FindClientInputDto {
    id: string;
  }
  
  export interface FindClientOutputDto {
    id: string;
    name: string;
    email: string;
    document: string;
    street: string;
    number: string;
    complement: string;
    state: string;
    city: string;
    zipcode: string;
    createdAt: Date;
    updatedAt: Date;
  }