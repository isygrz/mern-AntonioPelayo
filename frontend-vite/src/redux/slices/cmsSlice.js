import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axiosInstance';

// ✅ Fetch CMS sections by route (e.g., '/')
export const fetchCmsByRoute = createAsyncThunk(
  'cms/fetchByRoute',
  async (route, thunkAPI) => {
    try {
      const response = await axios.get(`/api/cms?route=${route}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// ✅ Update CMS layout (e.g., after admin saves changes)
export const updateCmsLayout = createAsyncThunk(
  'cms/updateCms',
  async ({ route, sections }, thunkAPI) => {
    try {
      const response = await axios.patch(`/api/cms`, { route, sections });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
  success: false,
};

const cmsSlice = createSlice({
  name: 'cms',
  initialState,
  reducers: {
    resetCmsStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCmsByRoute.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCmsByRoute.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.sections || [];
      })
      .addCase(fetchCmsByRoute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load CMS sections.';
      })
      .addCase(updateCmsLayout.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updateCmsLayout.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateCmsLayout.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || 'Failed to update CMS layout.';
      });
  },
});

export const { resetCmsStatus } = cmsSlice.actions;
export default cmsSlice.reducer;
