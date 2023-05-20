import { Pool } from 'pg';
import 'dotenv/config';

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

if (!PG_HOST || !PG_PORT || !PG_DATABASE || !PG_USERNAME || !PG_PASSWORD) {
  throw new Error('Missing database configurations');
}

const connectionString = `postgres://${PG_USERNAME}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${PG_DATABASE}`;

const pgClient = new Pool({
  connectionString,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pgClient.connect().catch(console.error);

export default pgClient;
