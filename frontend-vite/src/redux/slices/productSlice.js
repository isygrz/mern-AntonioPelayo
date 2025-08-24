import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

/**
 * Products slice
 * - Keeps both items (preferred) and products (compat) so older components keep working
 */

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get('/products'); // axios base already has /api
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || err.message || 'Failed to load products'
      );
    }
  }
);

export const getProductById = createAsyncThunk(
  'products/getById',
  async (id, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`/products/${id}`);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || err.message || 'Failed to load product'
      );
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/create',
  async (newProduct, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post('/products', newProduct);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          err.message ||
          'Failed to create product'
      );
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, updatedProduct }, thunkAPI) => {
    try {
      const { data } = await axiosInstance.put(
        `/products/${id}`,
        updatedProduct
      );
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          err.message ||
          'Failed to update product'
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id, thunkAPI) => {
    try {
      await axiosInstance.delete(`/products/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          err.message ||
          'Failed to delete product'
      );
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    products: [], // compat
    currentProduct: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload) ? action.payload : [];
        state.products = state.items; // compat mirror
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error?.message || 'Failed to load products';
      })

      // Get by ID
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error?.message || 'Failed to load product';
      })

      // Create
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?._id) {
          state.items.push(action.payload);
          state.products = state.items; // mirror
        }
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error?.message || 'Failed to create product';
      })

      // Update
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.items.findIndex((p) => p._id === action.payload?._id);
        if (idx !== -1) {
          state.items[idx] = action.payload;
          state.products = state.items; // mirror
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error?.message || 'Failed to update product';
      })

      // Delete
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((p) => p._id !== action.payload);
        state.products = state.items; // mirror
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error?.message || 'Failed to delete product';
      });
  },
});

// Selectors
export const selectProducts = (s) =>
  s.products?.items?.length ? s.products.items : s.products?.products || [];
export const selectProductsLoading = (s) => !!s.products?.loading;
export const selectProductsError = (s) => s.products?.error || null;
export const selectCurrentProduct = (s) => s.products?.currentProduct || null;

export default productSlice.reducer;
