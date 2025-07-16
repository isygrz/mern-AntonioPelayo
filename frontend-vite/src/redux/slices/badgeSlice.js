import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utils/axiosInstance';

export const fetchBadges = createAsyncThunk('badges/fetchAll', async () => {
  const { data } = await axios.get('/api/badges');
  return data;
});

export const createBadge = createAsyncThunk('badges/create', async () => {
  const { data } = await axios.post('/api/badges');
  return data;
});

export const updateBadge = createAsyncThunk(
  'badges/update',
  async ({ id, updates }) => {
    const { data } = await axios.put(`/api/badges/${id}`, updates);
    return data;
  }
);

export const deleteBadge = createAsyncThunk('badges/delete', async (id) => {
  await axios.delete(`/api/badges/${id}`);
  return id;
});

const badgeSlice = createSlice({
  name: 'badges',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBadges.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBadges.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBadges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createBadge.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateBadge.fulfilled, (state, action) => {
        const i = state.items.findIndex((b) => b._id === action.payload._id);
        if (i !== -1) state.items[i] = action.payload;
      })
      .addCase(deleteBadge.fulfilled, (state, action) => {
        state.items = state.items.filter((b) => b._id !== action.payload);
      });
  },
});

export default badgeSlice.reducer;
