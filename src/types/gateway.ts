import { Intents, Opcode } from "../constants.ts";

export interface ClientOptions {
  token: string;
  intents: Intents[];
  identify?: IdentifyDataProperties;
}

export interface GatewayPayload {
  url: string;
}

export interface SessionPayload {
  total: number;
  remaining: number;
  reset_after: number;
  max_concurrency: number;
}

export interface GatewayBotPayload extends GatewayPayload {
  shards: number;
  session_start_limit: SessionPayload;
}

enum DataTypes {
  HelloData,
  IdentifyData,
}

export interface PacketPayload {
  op: Opcode;
  d?: Record<symbol, DataTypes>;
  s?: number | null;
  t?: string | null;
}

export interface HelloData {
  heartbeat_interval: number;
}

export interface IdentifyData {
  token: string;
  intents: number;
  properties: IdentifyDataProperties;
}

export interface IdentifyDataProperties {
  $os: string;
  $browser: string;
  $device: string;
}
