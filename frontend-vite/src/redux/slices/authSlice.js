import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const checkEmailStatus = createAsyncThunk(
  'auth/checkEmailStatus',
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/users/check-email', { email });
      return data; // { exists, role, isApproved }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Check failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/users/register', formData);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Registration failed'
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/users/login', credentials);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  await axios.post('/api/users/logout');
  return true;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userInfo: null,
    checkStatus: null,
    loading: false,
    error: null,
    selectedRole: null,
    isAuthenticated: false,
  },
  reducers: {
    setSelectedRole: (state, action) => {
      state.selectedRole = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Check Email
      .addCase(checkEmailStatus.pending, (state) => {
        state.loading = true;
        state.checkStatus = null;
        state.error = null;
      })
      .addCase(checkEmailStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.checkStatus = action.payload;
      })
      .addCase(checkEmailStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.userInfo = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setSelectedRole } = authSlice.actions;
export default authSlice.reducer;
