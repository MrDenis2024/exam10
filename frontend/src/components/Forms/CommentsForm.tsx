import React, {useState} from 'react';
import ButtonSpinner from '../Spinner/ButtonSpinner';
import {CommentMutation} from '../../types';

interface Props {
  newsId: string;
  onSubmitComment: (comment: CommentMutation) => void;
  createCommentLoading: boolean;
}

const CommentsForm: React.FC<Props> = ({newsId, onSubmitComment, createCommentLoading}) => {
  const [comment, setComment] = useState<CommentMutation>( {
    news_id: parseInt(newsId),
    author: '',
    text: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;

    setComment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    onSubmitComment({...comment});

    setComment((prevState) => ({
      ...prevState,
      author: '',
      text: '',
    }));
  };

  return (
    <form className='mt-5' onSubmit={submitFormHandler}>
      <div className='form-group mb-3 d-flex align-items-center'>
        <label htmlFor="author" className='col-1'>Name:</label>
        <input type="text" name="author" id="author" className='form-control' onChange={inputChangeHandler}
               value={comment.author} />
      </div>
      <div className='form-group mb-3 d-flex align-items-center'>
        <label htmlFor="text" className='col-1'>Comment:</label>
        <textarea id="text" name='text' cols={150} rows={5} className="border border-primary-subtle"
                  required
                  placeholder="Enter your comment" value={comment.text} onChange={inputChangeHandler}></textarea>
      </div>
      <div className='d-flex justify-content-end'>
        <button type='submit' className='btn btn-success' disabled={createCommentLoading}>{createCommentLoading &&
          <ButtonSpinner/>} Add
        </button>
      </div>
    </form>
  );
};

export default CommentsForm;