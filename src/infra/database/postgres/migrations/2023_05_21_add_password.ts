import pgClient from '../postgres';

export default async function addPassword() {
  const query = `
    drop table account_password;
    alter table account add column password varchar(255) not null;
  `;
  await pgClient.query(query);
}
