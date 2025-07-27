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

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userInfo: null,
    checkStatus: null,
    loading: false,
    error: null,
    selectedRole: null,
  },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
    },
    setSelectedRole: (state, action) => {
      state.selectedRole = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export const { logout, setSelectedRole } = authSlice.actions;
export default authSlice.reducer;
