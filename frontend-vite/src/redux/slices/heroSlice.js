import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utils/axiosInstance';

export const fetchHeroes = createAsyncThunk('heroes/fetchAll', async () => {
  const { data } = await axios.get('/api/heroes');
  return data;
});

export const createHero = createAsyncThunk('heroes/create', async () => {
  const { data } = await axios.post('/api/heroes');
  return data;
});

export const updateHero = createAsyncThunk(
  'heroes/update',
  async ({ id, updates }) => {
    const { data } = await axios.put(`/api/heroes/${id}`, updates);
    return data;
  }
);

export const deleteHero = createAsyncThunk('heroes/delete', async (id) => {
  await axios.delete(`/api/heroes/${id}`);
  return id;
});

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
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchHeroes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createHero.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateHero.fulfilled, (state, action) => {
        const i = state.items.findIndex((h) => h._id === action.payload._id);
        if (i !== -1) state.items[i] = action.payload;
      })
      .addCase(deleteHero.fulfilled, (state, action) => {
        state.items = state.items.filter((h) => h._id !== action.payload);
      });
  },
});

export default heroSlice.reducer;
