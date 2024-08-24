import NewsForm from '../../components/Forms/NewsForm';
import {NewsWithoutId} from '../../types';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useNavigate} from 'react-router-dom';
import {selectorCreateLoading} from '../../store/newsSlice';
import {toast} from 'react-toastify';
import {createNews} from '../../store/newsThunks';

const NewNews = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectorCreateLoading);

  const onFormSubmit = async (news: NewsWithoutId) => {
    try {
      await dispatch(createNews(news)).unwrap();
      navigate('/');
      toast.success('Новость успешна обуплкиковнна');
    } catch (e) {
      toast.error('Произошла ошибка публикации новости');
    }
  };
  return (
    <>
      <NewsForm onSubmit={onFormSubmit} createLoading={isCreating}/>
    </>
  );
};

export default NewNews;