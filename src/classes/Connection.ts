import { Opcode } from "../constants.ts";
import { HelloData, IdentifyData, IdentifyDataProperties, PacketPayload } from "../types/gateway.ts";

export class Connection {
  private _s: number | null = null;
  private _identify: IdentifyDataProperties = { $os: "linux", $browser: "deno_discord", $device: "deno_discord" };
  private _heartbeat!: number;
  ws!: WebSocket;

  constructor(
    public token: string,
    public intents: number,
    identify?: IdentifyDataProperties,
  ) {
    if (identify) this._identify = identify;
  }

  onMessage(ev: MessageEvent) {
    const packet = JSON.parse(ev.data) as PacketPayload;
    this._s = packet.s!;

    switch (packet.op) {
      case Opcode.HELLO: {
        const data = packet.d as HelloData;
        this.heartbeat(data.heartbeat_interval);

        const response: PacketPayload = {
          op: Opcode.IDENTIFY,
          d: {
            token: this.token,
            intents: this.intents,
            properties: this._identify,
          } as IdentifyData,
        };

        return this.send(response);
      }
    }
  }

  heartbeat(interval: number) {
    this._heartbeat = setInterval(() => {
      const response: PacketPayload = {
        op: Opcode.HEARTBEAT,
        d: this._s!,
      };

      return this.send(response);
    }, interval);
  }

  send(payload: PacketPayload) {
    return this.ws.send(JSON.stringify(payload));
  }
}
