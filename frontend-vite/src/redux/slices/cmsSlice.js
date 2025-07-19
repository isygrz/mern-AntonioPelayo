import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utils/axiosInstance';

export const fetchCmsByRoute = createAsyncThunk(
  'cms/fetchCmsByRoute',
  async (route = '/', { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/cms?route=${route}`);
      return { ...data, route };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateCms = createAsyncThunk(
  'cms/updateCms',
  async ({ route, sections }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(`/api/cms`, { route, sections });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const cmsSlice = createSlice({
  name: 'cms',
  initialState: {
    route: '/',
    sections: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetCmsStatus: (state) => {
      state.success = false;
      state.error = null;
    },
    reorderSections: (state, action) => {
      state.sections = action.payload;
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
        state.sections = action.payload?.sections || [];
        state.route = action.payload?.route || '/';
      })
      .addCase(fetchCmsByRoute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCms.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updateCms.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.sections = action.payload.sections;
      })
      .addCase(updateCms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCmsStatus, reorderSections } = cmsSlice.actions;
export default cmsSlice.reducer;
