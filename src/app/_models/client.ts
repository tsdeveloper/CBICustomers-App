import { Address } from "./address";


export interface Client {
  id: string;
  displayName: string;
  phone: string;
  address: Address;
  createdAt: string;
  updateAt: string | null;
  roles: string[];
  token: string;

}
