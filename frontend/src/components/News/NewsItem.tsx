import React from 'react';
import imageNotFound from '../../assests/images/image-not-found.jpg';
import {API_URL} from '../../constants';
import dayjs from 'dayjs';
import {News} from '../../types';
import {Link} from 'react-router-dom';
import ButtonSpinner from '../Spinner/ButtonSpinner';

interface Props {
  news: News,
  onDelete: VoidFunction,
  deleteLoading: number | false;
}

const NewsItem: React.FC<Props> = ({news, onDelete, deleteLoading}) => {
  let postImage = imageNotFound;

  if(news.image) {
    postImage = `${API_URL}/${news.image}`;
  }
  return (
    <div className='d-flex gap-4 align-items-center border rounded-3 border-info-subtle mb-3 p-3'>
      <img className='rounded-4 col-3' style={{width: '100px', maxHeight: '100px'}} src={postImage} alt={news.title} />
      <div className='col-10'>
        <p>{news.title}</p>
        <div className='d-flex align-items-center justify-content-between'>
          <span>At: {dayjs(news.date_added).format('DD.MM.YYYY HH:mm')}</span>
          <div className='col-4 d-flex justify-content-between'>
            <Link to={`/news/${news.id}`} className='btn btn-success' >Read full post</Link>
            <button className='btn btn-danger' onClick={onDelete} disabled={deleteLoading ? deleteLoading === news.id : false}>{deleteLoading && deleteLoading === news.id && (<ButtonSpinner />)}Delete post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;