import React, {useState} from 'react';
import {NewsWithoutId} from '../../types';
import FileInput from './FileInput';
import ButtonSpinner from '../Spinner/ButtonSpinner';

interface Props {
  onSubmit: (news: NewsWithoutId) => void;
  createLoading: boolean;
}

const NewsForm: React.FC<Props> = ({onSubmit, createLoading}) => {
  const [news, setNews] = useState<NewsWithoutId>( {
    title: '',
    description: '',
    image: null,
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;

    setNews((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = event.target;
    const value = files && files[0] ? files[0] : null;

    setNews((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({...news});
  };

  return (
    <form className='mt-5' onSubmit={submitFormHandler}>
      <h4 className='mb-5'>Add new post</h4>
      <div className='form-group mb-3 d-flex align-items-center'>
        <label htmlFor="title" className='col-1'>Title:</label>
        <input type="text" name="title" id="title" className='form-control' onChange={inputChangeHandler}
               value={news.title} required/>
      </div>
      <div className='form-group mb-3 d-flex align-items-center'>
        <label htmlFor="description" className='col-1'>Content:</label>
        <textarea id="description" name='description' cols={150} rows={3} className="border border-primary-subtle"
                  required
                  placeholder="Enter content" value={news.description} onChange={inputChangeHandler}></textarea>
      </div>
      <div className="form-group mb-4 d-flex align-items-center">
        <FileInput onChange={fileInputChangeHandler}/>
      </div>
      <div className='col-2 d-flex justify-content-end'>
        <button type='submit' className='btn btn-success' disabled={createLoading}>{createLoading &&
          <ButtonSpinner/>}Save news
        </button>
      </div>
    </form>
  );
};

export default NewsForm;