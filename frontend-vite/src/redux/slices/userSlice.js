import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axiosInstance';

// Fetch all users (admin only)
export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/users');
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch users'
      );
    }
  }
);

// Approve vendor user (admin only)
export const approveVendor = createAsyncThunk(
  'users/approveVendor',
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/users/${userId}/approve`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Approval failed');
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
    approveSuccess: false,
  },
  reducers: {
    resetApproveSuccess: (state) => {
      state.approveSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Approve vendor
      .addCase(approveVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.approveSuccess = false;
      })
      .addCase(approveVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.approveSuccess = true;
        // update the user in local users state
        const index = state.users.findIndex(
          (u) => u._id === action.payload._id
        );
        if (index !== -1) state.users[index] = action.payload;
      })
      .addCase(approveVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetApproveSuccess } = userSlice.actions;
export default userSlice.reducer;
