import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectorFetchOneLoading, selectorOneNews} from '../../store/newsSlice';
import {useParams} from 'react-router-dom';
import {oneNews} from '../../store/newsThunks';
import Spinner from '../../components/Spinner/Spinner';
import imageNotFound from '../../assests/images/image-not-found.jpg';
import {API_URL} from '../../constants';
import dayjs from 'dayjs';

const NewsPage = () => {
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectorOneNews);
  const loadingOneNews = useAppSelector(selectorFetchOneLoading);
  const {id} = useParams();
  const stub = imageNotFound;

  useEffect(() => {
    if(id) {
      dispatch(oneNews(id));
    }
  }, [dispatch, id]);


  return (
    <>
      {loadingOneNews && <div className='text-center mt-5'><Spinner /></div>}
      {news &&
        <div className="d-flex gap-5 flex-column mt-4">
          <div className="d-flex gap-5 align-items-center">
            <img style={{width: '200px', maxHeight: '200px'}} src={news.image ? (`${API_URL}/${news.image}`) : (stub)}
                 alt={news.title}/>
            <div>
              <h2>{news.title}</h2>
              <span>At: {dayjs(news.date_added).format('DD.MM.YYYY HH:mm')}</span>
            </div>
          </div>
          <div>
            <h3>Content:</h3>
            <p className="mb-0 mt-2">{news.description}</p>
          </div>
        </div>
      }
    </>
  );
};

export default NewsPage;