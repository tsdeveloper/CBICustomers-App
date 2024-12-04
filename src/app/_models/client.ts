import { Address } from "./address";


export interface Client {
  id: string;
  name: string;
  address: Address[];
  // roles: string[];
  token: string;
}


// export class ClientEdit {
//   id = '';
//   name = '';
//   email= '';

// }
