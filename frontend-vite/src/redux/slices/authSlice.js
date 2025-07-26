import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axiosInstance';

// ✅ REGISTER
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData, thunkAPI) => {
    try {
      const { data } = await axios.post('/api/users/register', formData);
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Registration failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ✅ LOGIN
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      });
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Login failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ✅ LOAD SESSION (on page load)
export const hydrateUser = createAsyncThunk(
  'auth/hydrateUser',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/api/users/profile');
      return data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || null;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userInfo: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    selectedRole: null, // ✅ NEW: role choice from accountTypeSelector
  },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.isAuthenticated = false;
      state.error = null;
      state.selectedRole = null; // ✅ Clear selectedRole too
      localStorage.removeItem('auth');
    },
    setGuest: (state, action) => {
      state.userInfo = {
        isGuest: true,
        guestSessionId: action.payload.guestSessionId,
        email: action.payload.email || null,
      };
      state.isAuthenticated = false;
      state.error = null;
    },
    setSelectedRole: (state, action) => {
      state.selectedRole = action.payload; // ✅ Store role
    },
  },
  extraReducers: (builder) => {
    builder
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
      .addCase(hydrateUser.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(hydrateUser.rejected, (state) => {
        state.userInfo = null;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, setGuest, setSelectedRole } = authSlice.actions;
export default authSlice.reducer;
