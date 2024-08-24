import express from 'express';
import config from './config';
import cors from 'cors';
import mysqlDb from './mysqlDb';
import newsRouter from './routes/news';
import commentsRouter from './routes/comments';

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors(config.corsOptions));
app.use(express.static('public'));
app.use('/news', newsRouter);
app.use('/comments', commentsRouter);


const run = async () => {
  await mysqlDb.init();

  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
};

run().catch(console.error);