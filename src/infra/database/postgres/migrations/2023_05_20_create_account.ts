import pgClient from '../postgres';

export default async function createAccountTable() {
  await pgClient.query(`
        create table if not exists account (
            id uuid primary key default uuid_generate_v4(),
            name varchar(255) not null,
            email varchar(255) not null unique,
            created_at timestamp not null default now(),
            updated_at timestamp not null default now()
        );

        create table if not exists account_password (
            account_id uuid primary key not null references account(id) on delete cascade,
            password varchar(255) not null
        );
    `);
}
