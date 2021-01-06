import { API_VERSION, Gateway } from "../constants.ts";
import { ClientOptions, GatewayBotPayload } from "../types/gateway.ts";
import { Api } from "./Api.ts";
import { Connection } from "./Connection.ts";

export class Client extends Connection {
  api: Api;

  constructor(options: ClientOptions) {
    super(options.token, options.intents.reduce((a, b) => a + b), options.identify);
    this.api = new Api(options.token);
  }

  async connect() {
    const request = await this.api.get(Gateway.GET_BOT) as GatewayBotPayload;
    this.ws = new WebSocket(`${request.url}/?encoding=json&v=${API_VERSION}`);

    this.ws.onmessage = (ev) => this.onMessage(ev);
  }
}
