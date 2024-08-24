import {createSlice} from '@reduxjs/toolkit';
import {deleteNews, fetchNews} from './newsThunks';
import {News} from '../types';

export interface NewsState {
  fetchLoading: boolean,
  deleteLoading: false | number;
  allNews: News[],
}

const initialState: NewsState = {
  fetchLoading: false,
  deleteLoading: false,
  allNews: [],
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNews.pending, (state: NewsState) => {
      state.fetchLoading = true;
    }).addCase(fetchNews.fulfilled, (state: NewsState, {payload: news}) =>{
      state.allNews = news;
      state.fetchLoading = false;
    }).addCase(fetchNews.rejected, (state: NewsState) => {
      state.fetchLoading = false;
    });

    builder.addCase(deleteNews.pending, (state: NewsState, {meta: {arg: newsId}}) => {
      state.deleteLoading = newsId;
    }).addCase(deleteNews.fulfilled, (state: NewsState) => {
      state.deleteLoading = false;
    }).addCase(deleteNews.rejected, (state: NewsState) => {
      state.deleteLoading = false;
    });
  },
  selectors: {
    selectorFetchLoading: (state: NewsState) => state.fetchLoading,
    selectorAllNews: (state: NewsState) => state.allNews,
    selectorDeleteLoading: (state: NewsState) => state.deleteLoading,
  },
});

export const newsReducer = newsSlice.reducer;
export const {
  selectorFetchLoading,
  selectorAllNews,
  selectorDeleteLoading,
} = newsSlice.selectors;