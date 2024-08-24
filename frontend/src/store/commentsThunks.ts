import {createAsyncThunk} from '@reduxjs/toolkit';
import {Comment, CommentMutation} from '../types';
import axiosApi from '../axiosApi';

export const fetchComments = createAsyncThunk<Comment[], string>('comments/fetch', async (id) => {
  const {data: comments} = await axiosApi.get<Comment[]>(`/comments/${id}`);
  return comments;
});

export const deleteComment = createAsyncThunk<void, number>('comments/delete', async (id) => {
  await axiosApi.delete(`/comments/${id}`);
});

export const createComment = createAsyncThunk<void, CommentMutation>('comments/create', async (comment) => {
  await axiosApi.post('/comments', comment);
});