interface Gateway {
  url: string;
}

interface Session {
  total: number;
  remaining: number;
  reset_after: number;
  max_concurrency: number;
}

interface GatewayBot extends Gateway {
  shards: number;
  session_start_limit: Session;
}
