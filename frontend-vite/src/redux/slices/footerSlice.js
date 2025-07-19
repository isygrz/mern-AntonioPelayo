import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axiosInstance';

// 🔄 Fetch footer from backend
export const fetchFooter = createAsyncThunk(
  'footer/fetchFooter',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/api/footer');
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// ✏️ Update footer (admin only)
export const updateFooter = createAsyncThunk(
  'footer/updateFooter',
  async (footerData, thunkAPI) => {
    try {
      const { data } = await axios.put('/api/footer', footerData);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

const footerSlice = createSlice({
  name: 'footer',
  initialState: {
    footer: null,
    loading: false,
    error: null,
    updateSuccess: false,
  },
  reducers: {
    resetFooterStatus: (state) => {
      state.updateSuccess = false;
      state.error = null;
    },
  },
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
      })

      .addCase(updateFooter.pending, (state) => {
        state.loading = true;
        state.updateSuccess = false;
        state.error = null;
      })
      .addCase(updateFooter.fulfilled, (state, action) => {
        state.loading = false;
        state.footer = action.payload;
        state.updateSuccess = true;
      })
      .addCase(updateFooter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetFooterStatus } = footerSlice.actions;
export default footerSlice.reducer;
