import { Client } from "./client";

export interface Address  {
  name: string;
  clientId: string;
  zipCode: string;
  city: string;
  state: string;
  client: Client;
}
