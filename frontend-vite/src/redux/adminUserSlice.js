import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/axiosInstance';

export const listPendingUsers = createAsyncThunk(
  'adminUsers/listPending',
  async ({ page = 1, pageSize = 20 } = {}, thunkAPI) => {
    try {
      const { data } = await api.get('/admin/users/pending', {
        params: { page, pageSize },
      });
      return data; // { items, total, page, pageSize }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || err.message
      );
    }
  }
);

export const approveUser = createAsyncThunk(
  'adminUsers/approve',
  async (id, thunkAPI) => {
    try {
      const { data } = await api.post(`/admin/users/${id}/approve`);
      // Optional: notify auth slice (current user might be the one approved)
      if (typeof window !== 'undefined')
        document.dispatchEvent(new CustomEvent('auth:refresh'));
      return data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || err.message
      );
    }
  }
);

export const rejectUser = createAsyncThunk(
  'adminUsers/reject',
  async (id, thunkAPI) => {
    try {
      const { data } = await api.post(`/admin/users/${id}/reject`);
      return data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || err.message
      );
    }
  }
);

const slice = createSlice({
  name: 'adminUsers',
  initialState: {
    pending: { items: [], total: 0, page: 1, pageSize: 20 },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listPendingUsers.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(listPendingUsers.fulfilled, (s, a) => {
        s.loading = false;
        s.pending = a.payload || s.pending;
      })
      .addCase(listPendingUsers.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload || a.error.message;
      })
      .addCase(approveUser.fulfilled, (s, a) => {
        s.pending.items = s.pending.items.filter(
          (u) => u._id !== a.payload._id
        );
        s.pending.total = Math.max(0, s.pending.total - 1);
      })
      .addCase(rejectUser.fulfilled, (s, a) => {
        s.pending.items = s.pending.items.filter(
          (u) => u._id !== a.payload._id
        );
        s.pending.total = Math.max(0, s.pending.total - 1);
      });
  },
});

export default slice.reducer;
