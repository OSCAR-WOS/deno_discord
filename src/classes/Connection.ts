import { Opcode } from "../constants.ts";
import { IdentifyData, IdentifyDataProperties, PacketPayload } from "../types/gateway.ts";

export class Connection {
  private _s: number | null = null;
  private _identify: IdentifyDataProperties = { $os: "linux", $browser: "deno_discord", $device: "deno_discord" };
  ws!: WebSocket;

  constructor(
    public token: string,
    public intents: number,
    _identify?: IdentifyDataProperties,
  ) {
    if (_identify) this._identify = _identify;
  }

  onMessage(ev: MessageEvent) {
    const packet = JSON.parse(ev.data) as PacketPayload;
    this._s = packet.s!;

    switch (packet.op) {
      case Opcode.HELLO: {
        const response: PacketPayload = {
          op: Opcode.IDENTIFY,
          d: {
            token: this.token,
            intents: this.intents,
            properties: this._identify,
          } as IdentifyData,
        };

        return this.ws.send(JSON.stringify(response));
      }
    }
  }
}
