import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

// Async thunk to fetch CMS sections for a specific route (e.g. '/')
export const fetchCmsByRoute = createAsyncThunk(
  'cms/fetchByRoute',
  async (route = '/', thunkAPI) => {
    try {
      // ✅ Removed duplicate /api
      const { data } = await axiosInstance.get(`/cms?route=${route}`);
      console.log('✅ CMS sections from backend:', data.sections);
      return data.sections;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const cmsSlice = createSlice({
  name: 'cms',
  initialState: {
    loading: false,
    sections: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCmsByRoute.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCmsByRoute.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = action.payload;
      })
      .addCase(fetchCmsByRoute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cmsSlice.reducer;
