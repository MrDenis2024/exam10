import {createSlice} from '@reduxjs/toolkit';
import {createNews, deleteNews, fetchNews, oneNews} from './newsThunks';
import {News} from '../types';

export interface NewsState {
  fetchLoading: boolean,
  deleteLoading: false | number;
  fetchOneLoading: boolean;
  createLoading: boolean;
  oneNews: null | News,
  allNews: News[],
}

const initialState: NewsState = {
  fetchLoading: false,
  deleteLoading: false,
  fetchOneLoading: false,
  createLoading: false,
  allNews: [],
  oneNews: null,
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

    builder.addCase(oneNews.pending, (state: NewsState) => {
      state.oneNews = null;
      state.fetchOneLoading = true;
    }).addCase(oneNews.fulfilled, (state: NewsState, {payload: oneNews}) => {
      state.oneNews = oneNews;
      state.fetchOneLoading = false;
    }).addCase(oneNews.rejected, (state: NewsState) => {
      state.fetchOneLoading = false;
    });

    builder.addCase(createNews.pending, (state: NewsState) => {
      state.createLoading = true;
    }).addCase(createNews.fulfilled, (state: NewsState) => {
      state.createLoading = false;
    }).addCase(createNews.rejected, (state: NewsState) => {
      state.createLoading = false;
    });
  },
  selectors: {
    selectorFetchLoading: (state: NewsState) => state.fetchLoading,
    selectorAllNews: (state: NewsState) => state.allNews,
    selectorDeleteLoading: (state: NewsState) => state.deleteLoading,
    selectorFetchOneLoading: (state: NewsState) => state.fetchOneLoading,
    selectorOneNews: (state: NewsState) => state.oneNews,
    selectorCreateLoading: (state: NewsState) => state.createLoading,
  },
});

export const newsReducer = newsSlice.reducer;
export const {
  selectorFetchLoading,
  selectorAllNews,
  selectorDeleteLoading,
  selectorFetchOneLoading,
  selectorOneNews,
  selectorCreateLoading,
} = newsSlice.selectors;