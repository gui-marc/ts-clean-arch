import { exit } from 'process';

import createAccountTable from './2023_05_20_create_account';
import createExtensions from './2023_05_20_create_extensions';
import addPassword from './2023_05_21_add_password';

async function run() {
  await createExtensions();
  await createAccountTable();
  await addPassword();
}

run()
  .then(() => {
    console.log('ok');
    exit(0);
  })
  .catch(console.error);
