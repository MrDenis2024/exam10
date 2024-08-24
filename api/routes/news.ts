import express from 'express';
import mysqlDb from '../mysqlDb';
import {News, NewsWithoutId} from '../types';
import {imagesUpload} from '../multer';
import {ResultSetHeader} from 'mysql2';

const newsRouter = express.Router();

newsRouter.get('/', async (req, res, next) => {
  try {
    const result = await mysqlDb.getConnection().query('SELECT n.id, n.title, n.image, n.date_added FROM news AS n');

    const news = result[0] as News[];
    return res.send(news);
  } catch (e) {
    next(e);
  }
});

newsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    if(!req.body.title || !req.body.description) {
      return res.status(400).send({error: 'Title and description is required'});
    }

    const newNews: NewsWithoutId = {
      title: req.body.title,
      description: req.body.description,
      image: req.file ? req.file.filename : null,
    };

    await mysqlDb.getConnection().query('INSERT INTO news (title, description, image) VALUES (?, ?, ?)', [newNews.title, newNews.description, newNews.image]);
  } catch (e) {
    next(e);
  }
});

newsRouter.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await mysqlDb.getConnection().query('SELECT * FROM news WHERE id = ?', [id]);
    const news = result[0] as News[];

    if(news.length === 0) {
      return res.status(404).send({error: 'No news found'});
    }

    return res.send(news[0]);
  } catch (e) {
    next(e);
  }
});

newsRouter.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await mysqlDb.getConnection().query('DELETE FROM news WHERE id = ?', [id]);
    const resultHeader = result[0] as ResultSetHeader;

    if(resultHeader.affectedRows === 0) {
      return res.status(404).send({error: 'No news found'});
    }
  } catch (e) {
    next(e);
  }
});

export default newsRouter;
