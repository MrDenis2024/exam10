import express from 'express';
import mysqlDb from '../mysqlDb';
import {Comment, CommentWithoutId} from '../types';
import {ResultSetHeader} from 'mysql2';

const commentsRouter = express.Router();

commentsRouter.get('/:id?', async (req, res, next) => {
  try {
    const id = req.params.id;

    if(!id) {
      const result = await mysqlDb.getConnection().query('SELECT * FROM comments');
      const comments = result[0] as Comment[];
      return res.send(comments);
    }

    const result = await mysqlDb.getConnection().query('SELECT * FROM comments WHERE news_id = ?', [id]);
    const comments = result[0] as Comment[];
    return res.send(comments);
  } catch (e) {
    next(e);
  }
});

commentsRouter.post('/', async (req, res, next) => {
  try {
    if(!req.body.text || !req.body.news_id) {
      return res.status(400).send({error: 'Text and news_id is required'});
    }

    const comment: CommentWithoutId = {
      news_id: parseInt(req.body.news_id),
      author: req.body.author ? req.body.author : null,
      text: req.body.text,
    }

    const insertResult = await mysqlDb.getConnection().query('INSERT INTO comments (news_id, author, text) VALUES (?, ?, ?)', [comment.news_id, comment.author, comment.text]);
    const resultHeader = insertResult[0] as ResultSetHeader;
    const getNewResult = await mysqlDb.getConnection().query('SELECT * FROM comments WHERE id = ?', [resultHeader.insertId]);
    const newComment = getNewResult[0] as Comment[];
    return res.send(newComment[0]);
  } catch (e) {
    next(e);
  }
});

commentsRouter.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await mysqlDb.getConnection().query('DELETE FROM comments WHERE id = ?', [id]);
    const resultHeader = result[0] as ResultSetHeader;

    if(resultHeader.affectedRows === 0) {
      return res.status(404).send({error: 'No comment found'});
    }

    return res.send({message: 'Comment was deleted successfully.'})
  } catch (e) {
    next(e);
  }
});

export default commentsRouter;