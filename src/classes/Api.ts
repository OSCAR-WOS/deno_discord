import { Gateway } from "../constants.ts";

export class Api {
  private _url = "https://discord.com/api";
  private _headers: HeadersInit;

  constructor(token: string) {
    this._headers = new Headers({ "Authorization": `Bot ${token}` });
  }

  async get(endpoint: Gateway) {
    return await fetch(`${this._url}${endpoint}`, { method: "GET", headers: this._headers });
  }
}
