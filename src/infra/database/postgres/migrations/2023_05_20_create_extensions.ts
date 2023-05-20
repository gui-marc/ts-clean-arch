import pgClient from '../postgres';

export default async function createExtensions() {
  await pgClient.query(`
        create extension if not exists "uuid-ossp";
    `);
}
