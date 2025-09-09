import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

/**
 * Products slice (aligned with mixed API shapes)
 * - Public list endpoint may return an array OR an object { items, total, page, pageSize }
 * - Admin list uses { items, total, page, pageSize }
 */

// ------------------------------
// Public thunks (kept, but resilient to both shapes)
// ------------------------------
export const fetchAllProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get('/products'); // base '/api' is set in axiosInstance
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

// ------------------------------
// Admin-only listing
// ------------------------------
export const listProductsAdmin = createAsyncThunk(
  'products/listAdmin',
  async ({ page = 1, pageSize = 20 } = {}, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get('/products/admin', {
        params: { page, pageSize },
      });
      return data; // { items, total, page, pageSize }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          err.message ||
          'Failed to load admin products'
      );
    }
  }
);

// ------------------------------
// Write thunks
// ------------------------------
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

// ------------------------------
// Slice
// ------------------------------
const productSlice = createSlice({
  name: 'products',
  initialState: {
    // Public / legacy
    items: [],
    products: [], // compat mirror for older components
    currentProduct: null,

    // Admin paginated list
    admin: { items: [], total: 0, page: 1, pageSize: 20 },

    // Meta
    loading: false,
    error: null,
    lastChangedAt: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ----- Public: Fetch all -----
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload;
        const arr = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.items)
          ? payload.items
          : [];
        state.items = arr;
        state.products = arr; // compat mirror
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error?.message || 'Failed to load products';
      })

      // ----- Public: Get by ID -----
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload || null;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error?.message || 'Failed to load product';
      })

      // ----- Admin: List paginated -----
      .addCase(listProductsAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listProductsAdmin.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload || {};
        state.admin.items = Array.isArray(payload.items) ? payload.items : [];
        state.admin.total = Number(payload.total || 0);
        state.admin.page = Number(payload.page || 1);
        state.admin.pageSize = Number(payload.pageSize || 20);
      })
      .addCase(listProductsAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ||
          action.error?.message ||
          'Failed to load admin products';
      })

      // ----- Create -----
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        const doc = action.payload;
        if (doc?._id) {
          state.items.push(doc);
          state.products = state.items; // mirror
          if (Array.isArray(state.admin.items)) {
            state.admin.items.unshift(doc);
            state.admin.total = Number(state.admin.total || 0) + 1;
          }
          state.lastChangedAt = new Date().toISOString();
        }
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error?.message || 'Failed to create product';
      })

      // ----- Update -----
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        if (updated?._id) {
          const i = state.items.findIndex((p) => p._id === updated._id);
          if (i !== -1) state.items[i] = updated;
          state.products = state.items; // mirror
          if (Array.isArray(state.admin.items)) {
            const j = state.admin.items.findIndex((p) => p._id === updated._id);
            if (j !== -1) state.admin.items[j] = updated;
          }
          state.lastChangedAt = new Date().toISOString();
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error?.message || 'Failed to update product';
      })

      // ----- Delete -----
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        state.items = state.items.filter((p) => p._id !== id);
        state.products = state.items; // mirror
        if (Array.isArray(state.admin.items)) {
          state.admin.items = state.admin.items.filter((p) => p._id !== id);
          state.admin.total = Math.max(0, Number(state.admin.total || 0) - 1);
        }
        state.lastChangedAt = new Date().toISOString();
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error?.message || 'Failed to delete product';
      });
  },
});

// Selectors
export const selectProducts = (s) => {
  const arr = s.products?.items?.length
    ? s.products.items
    : s.products?.products || [];
  return arr;
};

export const selectProductsLoading = (s) => !!s.products?.loading;
export const selectProductsError = (s) => s.products?.error || null;
export const selectCurrentProduct = (s) => s.products?.currentProduct || null;
export const selectAdminProducts = (s) => s.products?.admin?.items || [];
export const selectAdminMeta = (s) => ({
  total: s.products?.admin?.total || 0,
  page: s.products?.admin?.page || 1,
  pageSize: s.products?.admin?.pageSize || 20,
});
export const selectProductsLastChangedAt = (s) =>
  s.products?.lastChangedAt || null;

export default productSlice.reducer;
