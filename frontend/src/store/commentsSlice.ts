import {createSlice} from '@reduxjs/toolkit';
import {createComment, deleteComment, fetchComments} from './commentsThunks';
import {Comment} from '../types';

export interface CommentsState {
  fetchLoading: boolean;
  deleteCommentLoading: false | number;
  createCommentLoading: boolean;
  comments: Comment[];
}

const initialState: CommentsState = {
  fetchLoading: false,
  deleteCommentLoading: false,
  createCommentLoading: false,
  comments: [],
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state: CommentsState) => {
      state.fetchLoading = true;
    }).addCase(fetchComments.fulfilled,  (state: CommentsState, {payload: comments}) => {
      state.fetchLoading = false;
      state.comments = comments;
    }).addCase(fetchComments.rejected, (state: CommentsState) => {
      state.fetchLoading = false;
    });

    builder.addCase(deleteComment.pending, (state: CommentsState, {meta: {arg: commentId}}) => {
      state.deleteCommentLoading = commentId;
    }).addCase(deleteComment.fulfilled, (state: CommentsState) => {
      state.deleteCommentLoading = false;
    }).addCase(deleteComment.rejected, (state: CommentsState) => {
      state.deleteCommentLoading = false;
    });

    builder.addCase(createComment.pending, (state: CommentsState) => {
      state.createCommentLoading = true;
    }).addCase(createComment.fulfilled, (state: CommentsState) => {
      state.createCommentLoading = false;
    }).addCase(createComment.rejected, (state: CommentsState) => {
      state.createCommentLoading = false;
    });
  },
  selectors: {
    selectorCommentsFetchLoading: (state: CommentsState) => state.fetchLoading,
    selectorComments: (state: CommentsState) => state.comments,
    selectorDeleteCommentLoading: (state: CommentsState) => state.deleteCommentLoading,
    selectorCreateCommentLoading: (state: CommentsState) => state.createCommentLoading,
  },
});

export const commentsReducer = commentsSlice.reducer;
export const {
  selectorCommentsFetchLoading,
  selectorComments,
  selectorDeleteCommentLoading,
  selectorCreateCommentLoading,
} = commentsSlice.selectors;