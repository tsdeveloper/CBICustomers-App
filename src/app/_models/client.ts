import { Address, AddressEdit } from "./address";


export interface Client {
  id: string;
  name: string;
  phone: string;
  address: Address;
  createdAt: string;
  updateAt: string | null;
  // roles: string[];
  token: string;

}


export class ClientEdit {
  id = '';
  name = '';
  email= '';
  phone= '';
  address:AddressEdit

}
