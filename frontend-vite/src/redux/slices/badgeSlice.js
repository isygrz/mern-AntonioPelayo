import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utils/axiosInstance';

// Thunks
export const fetchBadges = createAsyncThunk(
  'badges/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/badges');
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const createBadge = createAsyncThunk(
  'badges/create',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/badges', {});
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateBadge = createAsyncThunk(
  'badges/update',
  async (badge, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/badges/${badge._id}`, badge);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const deleteBadge = createAsyncThunk(
  'badges/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/badges/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Slice
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
        state.error = null;
      })
      .addCase(fetchBadges.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchBadges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBadge.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateBadge.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (b) => b._id === action.payload._id
        );
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteBadge.fulfilled, (state, action) => {
        state.items = state.items.filter((b) => b._id !== action.payload);
      });
  },
});

export default badgeSlice.reducer;
