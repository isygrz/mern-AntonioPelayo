import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utils/axiosInstance';

/**
 * Auth slice
 * - Persists userInfo to localStorage for UX continuity
 * - fetchProfile() rehydrates from cookie on refresh
 * - Adds postLoginRedirect handling in-state (fixes prior reducer that returned a string)
 * - Adds optional logoutServer thunk to clear server cookie
 */

const storageKey = 'auth.userInfo';
const redirectKey = 'auth.postLoginRedirect';

const getStored = (key) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/users/profile');
      return data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || 'Profile fetch failed'
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/users/login', credentials);
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/users/register', formData);
      return data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || 'Registration failed'
      );
    }
  }
);

export const logoutServer = createAsyncThunk('auth/logoutServer', async () => {
  try {
    await axios.post('/users/logout');
  } catch {
    // ignore server errors; client will still clear local state
  }
  return true;
});

const initialState = {
  loading: false,
  userInfo: getStoredUser(),
  isAuthenticated: !!getStoredUser(),
  error: null,
  selectedRole: null,
  postLoginRedirect: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutLocal: (state) => {
      state.userInfo = null;
      state.isAuthenticated = false;
      state.selectedRole = null;
      state.postLoginRedirect = null;
      try {
        localStorage.removeItem(storageKey);
      } catch {}
      try {
        localStorage.removeItem(redirectKey);
      } catch {}
    },
    setSelectedRole: (state, action) => {
      state.selectedRole = action.payload;
    },
    setPostLoginRedirect: (state, action) => {
      const target = action.payload || '/my-account/dashboard';
      state.postLoginRedirect = target;
      try {
        localStorage.setItem(redirectKey, target);
      } catch {}
    },
    consumePostLoginRedirect: (state) => {
      try {
        const v = localStorage.getItem(redirectKey);
        localStorage.removeItem(redirectKey);
        state.postLoginRedirect = v || null;
      } catch {
        state.postLoginRedirect = null;
      }
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.isAuthenticated = true;
        try {
          localStorage.setItem(storageKey, JSON.stringify(action.payload));
        } catch {}
        const def = '/my-account/dashboard';
        state.postLoginRedirect = def;
        try {
          localStorage.setItem(redirectKey, def);
        } catch {}
      })
      .addCase(loginUser.rejected, (state, action) => {
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
        try {
          localStorage.setItem(storageKey, JSON.stringify(action.payload));
        } catch {}
        const def = '/my-account/dashboard';
        state.postLoginRedirect = def;
        try {
          localStorage.setItem(redirectKey, def);
        } catch {}
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch profile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.isAuthenticated = true;
        try {
          localStorage.setItem(storageKey, JSON.stringify(action.payload));
        } catch {}
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.userInfo = null;
        state.isAuthenticated = false;
        state.error = action.payload;
        try {
          localStorage.removeItem(storageKey);
        } catch {}
      })

      // Logout server
      .addCase(logoutServer.fulfilled, (state) => {
        state.userInfo = null;
        state.isAuthenticated = false;
        state.selectedRole = null;
        state.postLoginRedirect = null;
        try {
          localStorage.removeItem(storageKey);
        } catch {}
        try {
          localStorage.removeItem(redirectKey);
        } catch {}
      });
  },
});

// Selectors
export const selectUser = (s) => s.auth?.userInfo || null;
export const selectIsAuthenticated = (s) => !!s.auth?.isAuthenticated;
export const selectAuthError = (s) => s.auth?.error || null;
export const selectPostLoginRedirect = (s) => s.auth?.postLoginRedirect || null;

export const {
  logoutLocal,
  setSelectedRole,
  setPostLoginRedirect,
  consumePostLoginRedirect,
  clearAuthError,
} = slice.actions;

export default slice.reducer;
