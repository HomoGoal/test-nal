import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createComment, listComment } from "src/services/apis/comment/comment";

export const createCommentAction: any = createAsyncThunk(
  "CREATE_COMMENT_ACTION",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await createComment(data);

      return res.data;
    } catch (error: any) {
      rejectWithValue(error.data);
    }
  }
);

export const getListComment: any = createAsyncThunk(
  "GET_LIST_COMMENT",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await listComment(data);

      return res.data;
    } catch (error: any) {
      rejectWithValue(error.data);
    }
  }
);

const initialState = {
  listComment: [],
  loading: false,
};

const Comment = createSlice({
  name: "comment",
  initialState,
  reducers: {
    // setTypeCart(state, action) {
    //     state.typeCart = action.payload;
    // },
  },
  extraReducers: {
    [createCommentAction.pending]: (state) => {
      state.loading = true;
    },
    [createCommentAction.rejected]: (state, action) => {
      state.loading = false;
    },
    [createCommentAction.fulfilled]: (state, action) => {
      state.loading = false;
    },

    [getListComment.pending]: (state) => {
      state.loading = true;
    },
    [getListComment.rejected]: (state, action) => {
      state.loading = false;
    },
    [getListComment.fulfilled]: (state, action) => {
      state.loading = false;
      state.listComment = action.payload;
    },
  },
});

// export const { setTypeCart} = Blog.actions;
const { reducer: commentReducer } = Comment;

export default commentReducer;
