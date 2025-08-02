import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axiosInstance';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        '/api/users/login',
        credentials
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        '/api/users/register',
        formData
      );
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Registration failed'
      );
    }
  }
);

export const checkEmailStatus = createAsyncThunk(
  'auth/checkEmailStatus',
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post('/api/users/check-email', {
        email,
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Check failed');
    }
  }
);

const initialState = {
  loading: false,
  userInfo: null,
  isAuthenticated: false,
  error: null,
  selectedRole: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.userInfo = null;
      state.isAuthenticated = false;
      state.selectedRole = null;
    },
    setSelectedRole: (state, action) => {
      state.selectedRole = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
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
      .addCase(checkEmailStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkEmailStatus.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(checkEmailStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser, setSelectedRole } = authSlice.actions;
export default authSlice.reducer;
