import {createAsyncThunk} from '@reduxjs/toolkit';
import {News} from '../types';
import axiosApi from '../axiosApi';

export const fetchNews = createAsyncThunk<News[]>('news/fetchAll', async () => {
  const {data: news} = await axiosApi.get('/news');
  return news;
});

export const deleteNews = createAsyncThunk<void, number>('news/delete', async (id) => {
  await axiosApi.delete(`/news/${id}`);
});