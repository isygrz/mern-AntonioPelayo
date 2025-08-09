import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

/**
 * Fetch a product by slug (preferred).
 * Kept compatible with existing usage by exporting fetchProductById as an alias below.
 */
export const fetchProductBySlug = createAsyncThunk(
  'productDetails/fetchBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/products/slug/${slug}`);
      return data;
    } catch (err) {
      const msg =
        err?.response?.data?.message || err.message || 'Failed to load product';
      return rejectWithValue(msg);
    }
  }
);

// Backward-compat alias (some screens may still dispatch fetchProductById(slug))
export const fetchProductById = fetchProductBySlug;

const initialState = {
  product: null,
  loading: false,
  error: null,
};

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {
    clearProductDetails: (state) => {
      state.product = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.product = null;
      })
      .addCase(fetchProductBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error loading product';
        state.product = null;
      });
  },
});

export const { clearProductDetails } = productDetailsSlice.actions;
export default productDetailsSlice.reducer;
