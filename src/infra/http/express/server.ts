import 'dotenv/config';
import express from 'express';

import router from './routes';

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${port}`);
});
