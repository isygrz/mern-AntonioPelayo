import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axiosInstance';
import toast from 'react-hot-toast';

export const fetchVendorProfile = createAsyncThunk(
  'vendorProfile/fetchVendorProfile',
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get('/vendor-profile/profile');
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to load profile'
      );
    }
  }
);

export const saveVendorProfile = createAsyncThunk(
  'vendorProfile/saveVendorProfile',
  async (profileData, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post(
        '/vendor-profile/profile',
        profileData
      );
      toast.success('Vendor profile saved');
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save profile');
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to save profile'
      );
    }
  }
);

const vendorProfileSlice = createSlice({
  name: 'vendorProfile',
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearVendorProfileState: (state) => {
      state.profile = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendorProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVendorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchVendorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(saveVendorProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      });
  },
});

export const { clearVendorProfileState } = vendorProfileSlice.actions;
export default vendorProfileSlice.reducer;
