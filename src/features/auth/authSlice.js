import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/backend/v1/auth/login';

export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, credentials);
    const decodedToken = parseJwt(response.data.access_token);
    console.log(decodedToken)
    return {
      access_token: response.data.access_token,
      refresh_token: response.data.refresh_token,
      user: decodedToken,
      message: response.data.message,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.errors[0]);
  }
});

export const refreshToken = createAsyncThunk('auth/refreshToken', async (_, thunkAPI) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/refresh`);
    const decodedToken = parseJwt(response.data.access_token);
    return {
      access_token: response.data.access_token,
      refresh_token: response.data.refresh_token,
      user: decodedToken,
      message: response.data.message,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.errors[0]);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    access_token: null,
    refresh_token: null,
    user: null,
    message: null,
    status: 'idle',
    errors: []
  },
  reducers: {
    logout: (state) => {
      state.access_token = null;
      state.refresh_token = null;
      state.user = null;
      state.message = null;
      state.errors = [];
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.errors = [];
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
        state.user = action.payload.user;
        state.message = action.payload.message;
        state.errors = [];
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.payload;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
        state.user = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.payload;
      });
  },
});

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

export const { logout } = authSlice.actions;
export default authSlice.reducer;
