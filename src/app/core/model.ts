export class Address {
  street: string;
  addressNumber: string;
  complement: string;
  district: string;
  zipCode: string;
  city: string;
  addressState: string;
}

export class Person {
  id: number;
  personName: string;
  active: boolean = true;
  address = new Address()
}

export class Category {
  id: number;
  categoryName: string;
}

export class Posting {
  id: number;
  postingDescription: string;
  dueDate: Date;
  paymentDate: Date;
  postingValue: number;
  note: string;
  postingType: string = 'RECEITA';
  category= new Category();
  person= new Person();
}

