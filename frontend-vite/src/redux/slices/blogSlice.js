import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utils/axiosInstance';

export const fetchBlogs = createAsyncThunk(
  'blogs/fetchAll',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/api/blogs');
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const createBlog = createAsyncThunk(
  'blogs/create',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.post('/api/blogs');
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const updateBlog = createAsyncThunk(
  'blogs/update',
  async (updatedBlog, thunkAPI) => {
    try {
      const { data } = await axios.put(
        `/api/blogs/${updatedBlog._id}`,
        updatedBlog
      );
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const deleteBlog = createAsyncThunk(
  'blogs/delete',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/api/blogs/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        const i = state.items.findIndex((b) => b._id === action.payload._id);
        if (i !== -1) state.items[i] = action.payload;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.items = state.items.filter((b) => b._id !== action.payload);
      });
  },
});

export default blogSlice.reducer;
