import React from 'react';
import {Comment} from '../../types';
import ButtonSpinner from '../Spinner/ButtonSpinner';

interface Props {
  comment: Comment;
  onDelete: VoidFunction,
  deleteLoading: number | false,
}

const CommentItem: React.FC<Props> = ({comment, onDelete, deleteLoading}) => {
  return (
    <div className='d-flex gap-4 align-items-center justify-content-between border rounded-3 border-info-subtle mb-3 p-3'>
      <div>
        <span>Author: <strong>{comment.author ? (comment.author) : ('Anonymous')}</strong></span>
        <p className='mb-0, mt-2'>Wrote: {comment.text}</p>
      </div>
      <div>
        <button className='btn btn-danger' onClick={onDelete} disabled={deleteLoading ? deleteLoading === comment.id : false} >{deleteLoading && deleteLoading === comment.id && (<ButtonSpinner />)}Delete</button>
      </div>
    </div>
  );
};

export default CommentItem;