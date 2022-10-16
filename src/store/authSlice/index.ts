import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  login,
  register,
  getMe,
  logout,
  refreshToken,
  loginGoogle,
} from "../../services/apis/auth";
import webStorage from "src/helpers/webStorage";
import { REFRESH_TOKEN } from "src/constants/configs";

export const loginAction: any = createAsyncThunk(
  "LOGIN_ACTION",
  async (data: any, { rejectWithValue }) => {
    try {
      const res: any = await login(data);

      return res?.data;
    } catch (error: any) {
      rejectWithValue(error.data);
    }
  }
);

export const registerAction: any = createAsyncThunk(
  "REGISTER_ACTION",
  async (data: any, { rejectWithValue }) => {
    try {
      const res: any = await register(data);
      return res.data;
    } catch (error: any) {
      rejectWithValue(error.data);
    }
  }
);

export const getMeAction: any = createAsyncThunk(
  "GET_ME_ACTION",
  async (_, { rejectWithValue }) => {
    try {
      const res: any = await getMe();
      return res.data;
    } catch (error: any) {
      rejectWithValue(error.data);
    }
  }
);

export const logOutAction: any = createAsyncThunk(
  "LOG_OUT_ACTION",
  async (_, { rejectWithValue }) => {
    try {
      const res: any = await logout();
      return res.data;
    } catch (error: any) {
      rejectWithValue(error.data);
    }
  }
);

export const refreshTokenAction: any = createAsyncThunk(
  "REFRESH_TOKEN_ACTION",
  async (data: any, { rejectWithValue }) => {
    try {
      const res: any = await refreshToken(data);
      return res.data;
    } catch (error: any) {
      rejectWithValue(error.data);
    }
  }
);

export const loginGoogleAction: any = createAsyncThunk(
  "LOGIN_GOOGLE_ACTION",
  async (data: any, { rejectWithValue }) => {
    try {
      const res: any = await loginGoogle(data);
      return res.data;
    } catch (error: any) {
      rejectWithValue(error.data);
    }
  }
);

const initialState = {
  auth: false,
  first: true,
  loading: false,
  user: {},
};

const Auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetFirst(state, action) {
      state.first = false;
    },
  },
  extraReducers: {
    [loginAction.pending]: (state) => {
      state.loading = true;
    },
    [loginAction.rejected]: (state, action) => {
      state.loading = false;
      state.first = false;
      state.auth = false;
    },
    [loginAction.fulfilled]: (state, action) => {
      state.loading = false;
      if (action?.payload) {
        webStorage.setToken(action?.payload?.data?.token);
        webStorage.set(REFRESH_TOKEN, action?.payload?.data?.refresh_token);
        state.first = true;
      } else {
        webStorage.remove({});
        state.first = false;
        state.auth = false;
      }
    },
    [loginGoogleAction.pending]: (state) => {
      state.loading = true;
    },
    [loginGoogleAction.rejected]: (state, action) => {
      state.loading = false;
      state.first = false;
      state.auth = false;
    },
    [loginGoogleAction.fulfilled]: (state, action) => {
      state.loading = false;
      if (action?.payload) {
        webStorage.setToken(action?.payload?.data?.token);
        webStorage.set(REFRESH_TOKEN, action?.payload?.data?.refresh_token);
        state.first = true;
      } else {
        webStorage.remove({});
        state.first = false;
        state.auth = false;
      }
    },
    [registerAction.pending]: (state) => {
      state.loading = true;
    },
    [registerAction.rejected]: (state, action) => {
      state.loading = false;
    },
    [registerAction.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [getMeAction.pending]: (state) => {
      state.loading = true;
    },
    [getMeAction.rejected]: (state, action) => {
      state.first = false;
      state.auth = false;
      state.loading = false;
      webStorage.removeAll();
    },
    [getMeAction.fulfilled]: (state, action) => {
      state.loading = false;
      state.first = false;
      state.auth = true;
      state.user = action.payload.data;
    },
    [logOutAction.pending]: (state) => {
      state.loading = true;
    },
    [logOutAction.rejected]: (state, action) => {
      state.loading = false;
    },
    [logOutAction.fulfilled]: (state, action) => {
      state.loading = false;
      state.first = false;
      state.auth = false;
      state.user = {};
      webStorage.removeAll();
    },
    [refreshTokenAction.pending]: (state) => {
      state.loading = true;
      state.auth = false;
    },
    [refreshTokenAction.rejected]: (state, action) => {
      state.loading = false;
      state.auth = false;
      webStorage.removeAll();
    },
    [refreshTokenAction.fulfilled]: (state, action) => {
      state.loading = false;
      state.auth = true;
      webStorage.setToken(action?.payload?.data?.token);
      webStorage.set(REFRESH_TOKEN, action?.payload?.data?.refresh_token);
    },
  },
});

export const { resetFirst } = Auth.actions;
const { reducer: authReducer } = Auth;

export default authReducer;
