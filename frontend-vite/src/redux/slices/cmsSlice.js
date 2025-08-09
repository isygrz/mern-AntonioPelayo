import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utils/axiosInstance';

export const fetchCmsByRoute = createAsyncThunk(
  'cms/fetchByRoute',
  async (route, thunkAPI) => {
    try {
      // axios baseURL already includes /api
      const { data } = await axios.get(
        `/cms?route=${encodeURIComponent(route)}`
      );
      return data.sections || [];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
          error.message ||
          'Failed to load CMS sections'
      );
    }
  }
);

export const updateCmsLayout = createAsyncThunk(
  'cms/updateLayout',
  async ({ route, sections }, thunkAPI) => {
    try {
      const { data } = await axios.patch('/cms', { route, sections });
      // PATCH returns { message, cms }, so grab cms.sections
      return data?.cms?.sections || [];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
          error.message ||
          'Failed to update CMS layout'
      );
    }
  }
);

const cmsSlice = createSlice({
  name: 'cms',
  initialState: {
    sections: [],
    loading: false,
    error: null,
    updateSuccess: false,
  },
  reducers: {
    resetCmsStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.updateSuccess = false;
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
        state.sections = action.payload;
      })
      .addCase(fetchCmsByRoute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load CMS sections';
      })
      .addCase(updateCmsLayout.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(updateCmsLayout.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = action.payload;
        state.updateSuccess = true;
      })
      .addCase(updateCmsLayout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update CMS layout';
      });
  },
});

export const { resetCmsStatus } = cmsSlice.actions;
export default cmsSlice.reducer;
