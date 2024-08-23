import express from 'express';
import config from './config';
import cors from 'cors';

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors(config.corsOptions));


const run = async () => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
};

run().catch(console.error);