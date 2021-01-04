import { Api } from "./Api.ts";

export class Client extends Api {
  constructor(token: string) {
    super(token);
  }
}
