import pgClient from '../postgres';

export default async function createAccountTable() {
  await pgClient.query(`
        create table if not exists account (
            id uuid primary key default uuid_generate_v4(),
            name varchar(255) not null,
            email varchar(255) not null unique,
            password varchar(255) not null,
            created_at timestamp not null default now(),
            updated_at timestamp not null default now()
        );
    `);
}
