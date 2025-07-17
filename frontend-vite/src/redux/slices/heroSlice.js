import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utils/axiosInstance';

// Thunks
export const fetchHeroes = createAsyncThunk(
  'heroes/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/heroes');
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const createHero = createAsyncThunk(
  'heroes/create',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/heroes', {});
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateHero = createAsyncThunk(
  'heroes/update',
  async (hero, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/heroes/${hero._id}`, hero);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const deleteHero = createAsyncThunk(
  'heroes/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/heroes/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Slice
const heroSlice = createSlice({
  name: 'heroes',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchHeroes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createHero.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateHero.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (h) => h._id === action.payload._id
        );
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteHero.fulfilled, (state, action) => {
        state.items = state.items.filter((h) => h._id !== action.payload);
      });
  },
});

export default heroSlice.reducer;
