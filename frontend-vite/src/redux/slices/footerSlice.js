import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utils/axiosInstance';

export const fetchFooter = createAsyncThunk(
  'footer/fetchFooter',
  async (_, thunkAPI) => {
    try {
      // axios baseURL already includes /api, so do NOT prefix with /api here
      const { data } = await axios.get('/footer');
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || err.message || 'Failed to load footer'
      );
    }
  }
);

const footerSlice = createSlice({
  name: 'footer',
  initialState: { footer: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFooter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFooter.fulfilled, (state, action) => {
        state.loading = false;
        state.footer = action.payload;
      })
      .addCase(fetchFooter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default footerSlice.reducer;
