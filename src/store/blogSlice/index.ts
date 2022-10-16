import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { listBlog, detailBlog } from "src/services/apis/blog/blog";

export const getListBlog: any = createAsyncThunk(
  "GET_LIST_BLOG",
  async (data: object, { rejectWithValue }) => {
    try {
      const res = await listBlog(data);

      return res.data;
    } catch (error: any) {
      rejectWithValue(error.data);
    }
  }
);

export const getDetailBlog: any = createAsyncThunk(
  "GET_DETAIL_BLOG",
  async (data: number, { rejectWithValue }) => {
    try {
      const res = await detailBlog(data);

      return res.data;
    } catch (error: any) {
      rejectWithValue(error.data);
    }
  }
);

const initialState = {
  listBlog: [],
  loading: false,
  detailBlog: {},
};

const Blog = createSlice({
  name: "blog",
  initialState,
  reducers: {
    // setTypeCart(state, action) {
    //     state.typeCart = action.payload;
    // },
  },
  extraReducers: {
    [getListBlog.pending]: (state) => {
      state.loading = true;
    },
    [getListBlog.rejected]: (state, action) => {
      state.loading = false;
    },
    [getListBlog.fulfilled]: (state, action) => {
      state.loading = false;
      state.listBlog = action.payload;
    },

    [getDetailBlog.pending]: (state) => {
      state.loading = true;
    },
    [getDetailBlog.rejected]: (state, action) => {
      state.loading = false;
    },
    [getDetailBlog.fulfilled]: (state, action) => {
      state.loading = false;
      state.detailBlog = action.payload;
    },
  },
});

// export const { setTypeCart} = Blog.actions;
const { reducer: blogReducer } = Blog;

export default blogReducer;
