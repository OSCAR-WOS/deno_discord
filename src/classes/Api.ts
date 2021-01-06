import { API_VERSION, Gateway } from "../constants.ts";

export class Api {
  private _url = `https://discord.com/api/v${API_VERSION}`;
  private _headers = new Headers({ "Content-Type": "application/json" });

  constructor(
    token: string,
  ) {
    this._headers.set("Authorization", `Bot ${token}`);
  }

  async get(endpoint: Gateway) {
    return await (await fetch(`${this._url}${endpoint}`, { method: "GET", headers: this._headers })).json();
  }
}
