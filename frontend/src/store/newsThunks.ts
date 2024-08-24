import {createAsyncThunk} from '@reduxjs/toolkit';
import {News, NewsWithoutId} from '../types';
import axiosApi from '../axiosApi';

export const fetchNews = createAsyncThunk<News[]>('news/fetchAll', async () => {
  const {data: news} = await axiosApi.get<News[]>('/news');
  return news.reverse();
});

export const deleteNews = createAsyncThunk<void, number>('news/delete', async (id) => {
  await axiosApi.delete(`/news/${id}`);
});

export const oneNews = createAsyncThunk<News, string>('news/fetchOne', async (id) => {
  const {data: newsResponse} = await axiosApi.get<News>(`/news/${id}`);
  return newsResponse;
});

export const createNews = createAsyncThunk<void, NewsWithoutId>('news/create', async (news) => {
  const formData = new FormData();
  formData.append('title', news.title);
  formData.append('description', news.description);

  if(news.image) {
    formData.append('image', news.image);
  }

  await axiosApi.post('/news', formData);
});