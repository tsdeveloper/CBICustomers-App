import { Client } from "./client";

export interface Address  {
  id: number;
  name: string;
  clientId: string;
  zipCode: string;
  city: string;
  state: string;
  client: Client;
}

export class AddressEdit  {
  id = 0;
  name:any = null;
  clientId:any = null;
  zipCode:any = null;
  city:any = null;
  state:any = null;

}
