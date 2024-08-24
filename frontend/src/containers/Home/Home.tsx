import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectorAllNews, selectorDeleteLoading, selectorFetchLoading} from '../../store/newsSlice';
import {useEffect} from 'react';
import {deleteNews, fetchNews} from '../../store/newsThunks';
import NewsItem from '../../components/News/NewsItem';
import Spinner from '../../components/Spinner/Spinner';
import {toast} from 'react-toastify';

const Home = () => {
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectorAllNews);
  const fetchLoading = useAppSelector(selectorFetchLoading);
  const deleteLoading = useAppSelector(selectorDeleteLoading);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const removeNews = async (newsId: number) => {
    try {
      if(window.confirm('Вы точно хотите удалить данну новость?')) {
        await dispatch(deleteNews(newsId)).unwrap();
        dispatch(fetchNews());
        toast.success('Новость успешно удалена');
      }
    } catch (e) {
      toast.error('Произошла ошибка удаления новости');
    }
  };

  return (
    <div className='mt-5'>
      <div className='d-flex align-items-center justify-content-between'>
        <h2>Posts</h2>
        <Link to={'/new-post'} className='btn btn-primary'>Add new post</Link>
      </div>
      <div className='mt-3'>
        {fetchLoading && <div className='text-center'><Spinner /> </div>}
        {news.length > 0 ? (news.map((oneNews) => (
          <NewsItem key={oneNews.id} news={oneNews} onDelete={() => removeNews(oneNews.id)} deleteLoading={deleteLoading}/>
        ))) : (<h2 className='text-center'>Новостоей нет</h2>)}
      </div>
    </div>
  );
};

export default Home;