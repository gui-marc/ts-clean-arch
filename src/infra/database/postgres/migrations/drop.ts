import 'dotenv/config';
import { exit } from 'process';

import pgClient from '../postgres';

async function run() {
  const database = process.env.PG_DATABASE;

  if (!database) {
    throw new Error('PG_DATABASE not defined');
  }

  const query = `select 'drop table "' || tablename || '" cascade;' from pg_tables;`;

  await pgClient.query(query);

  console.log(`database ${database} dropped`);
}

run()
  .catch(console.error)
  .finally(() => {
    pgClient.end().catch(console.error);
    exit(0);
  });
