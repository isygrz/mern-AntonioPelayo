import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  lastResultsCount: 0,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload || '';
    },
    setLastResultsCount(state, action) {
      state.lastResultsCount = Number(action.payload) || 0;
    },
    resetSearch() {
      return initialState;
    },
  },
});

export const { setQuery, setLastResultsCount, resetSearch } =
  searchSlice.actions;
export default searchSlice.reducer;
