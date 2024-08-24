import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectorFetchOneLoading, selectorOneNews} from '../../store/newsSlice';
import {useParams} from 'react-router-dom';
import {oneNews} from '../../store/newsThunks';
import Spinner from '../../components/Spinner/Spinner';
import imageNotFound from '../../assests/images/image-not-found.jpg';
import {API_URL} from '../../constants';
import dayjs from 'dayjs';
import {createComment, deleteComment, fetchComments} from '../../store/commentsThunks';
import {
  selectorComments,
  selectorCommentsFetchLoading,
  selectorCreateCommentLoading,
  selectorDeleteCommentLoading
} from '../../store/commentsSlice';
import CommentItem from '../../components/Comments/CommentItem';
import {toast} from 'react-toastify';
import CommentsForm from '../../components/Forms/CommentsForm';
import {CommentMutation} from '../../types';

const NewsPage = () => {
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectorOneNews);
  const loadingOneNews = useAppSelector(selectorFetchOneLoading);
  const comments = useAppSelector(selectorComments);
  const commentsLoading = useAppSelector(selectorCommentsFetchLoading);
  const deleteCommentLoading = useAppSelector(selectorDeleteCommentLoading);
  const createCommentLoading = useAppSelector(selectorCreateCommentLoading);
  const {id} = useParams() as {id: string};
  const stub = imageNotFound;

  useEffect(() => {
    dispatch(oneNews(id));
    dispatch(fetchComments(id));
  }, [dispatch, id]);

  const removeComment = async (commentId: number) => {
    try {
      if(window.confirm('Вы точно хотите удалить данны комментарий?')) {
        await dispatch(deleteComment(commentId)).unwrap();
        dispatch(fetchComments(id));
        toast.success('Комментарий успешно удален');
      }
    } catch (e) {
      toast.error('Произошла ошибка удаления комментария');
    }
  };

  const onFormSubmit = async (comment: CommentMutation) => {
    try {
      await dispatch(createComment(comment)).unwrap();
      dispatch(fetchComments(id));
      toast.success('Комментарий успешно отправлен');
    } catch (e) {
      toast.error('Произошла ошибка отправки комментария');
    }
  };

  return (
    <>
      {loadingOneNews && <div className='text-center mt-5'><Spinner /></div>}
      {news ? (<div className="d-flex flex-column mt-4">
          <div className="d-flex gap-5 align-items-center">
            <img style={{width: '200px', maxHeight: '200px'}} src={news.image ? (`${API_URL}/${news.image}`) : (stub)}
                 alt={news.title}/>
            <div>
              <h2>{news.title}</h2>
              <span>At: {dayjs(news.date_added).format('DD.MM.YYYY HH:mm')}</span>
            </div>
          </div>
          <div className='my-4'>
            <h3>Content:</h3>
            <p className="mb-0 mt-2">{news.description}</p>
          </div>
          <hr/>
          <div>
            <h4 className='text-center'>Comments</h4>
            {commentsLoading && <div className='text-center'><Spinner /></div>}
            {comments.length > 0 ? (comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} onDelete={() => removeComment(comment.id)} deleteLoading={deleteCommentLoading}/>
            ))) : (<h2 className='text-center'>Коминтариев нет</h2>)}
          </div>
          <hr/>
          <div className='mb-5'>
            <h4 className='text-center'>Add comment</h4>
            <CommentsForm newsId={id} onSubmitComment={onFormSubmit} createCommentLoading={createCommentLoading} />
          </div>
        </div>
      ) : (
        <div>
          <h3 className='text-center mt-5'>Извините такой страницы нет!</h3>
        </div>
      )}
    </>
  );
};

export default NewsPage;