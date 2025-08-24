import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utils/axiosInstance';

/**
 * Footer slice
 * - fetchFooter: GET /api/footer
 * - updateFooter: PUT /api/footer (admin only) with { links } or { sections }
 */

export const fetchFooter = createAsyncThunk(
  'footer/fetchFooter',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/footer'); // baseURL already includes /api
      return data; // { links, updatedAt }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || err.message || 'Failed to load footer'
      );
    }
  }
);

export const updateFooter = createAsyncThunk(
  'footer/updateFooter',
  async (payload, thunkAPI) => {
    try {
      // payload: { links } or { sections }
      const safe =
        payload && typeof payload === 'object' ? payload : { links: [] };
      const { data } = await axios.put('/footer', safe); // credentials sent by axiosInstance
      return data; // { links, updatedAt }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || err.message || 'Failed to update footer'
      );
    }
  }
);

const footerSlice = createSlice({
  name: 'footer',
  initialState: { footer: null, loading: false, error: null, saving: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
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
        state.error =
          action.payload || action.error?.message || 'Failed to load footer';
      })
      // update
      .addCase(updateFooter.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(updateFooter.fulfilled, (state, action) => {
        state.saving = false;
        state.footer = action.payload;
      })
      .addCase(updateFooter.rejected, (state, action) => {
        state.saving = false;
        state.error =
          action.payload || action.error?.message || 'Failed to update footer';
      });
  },
});

// Selectors
export const selectFooter = (s) => s.footer?.footer || null;
export const selectFooterLoading = (s) => !!s.footer?.loading;
export const selectFooterSaving = (s) => !!s.footer?.saving;
export const selectFooterError = (s) => s.footer?.error || null;

export default footerSlice.reducer;
