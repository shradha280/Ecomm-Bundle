import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBundles = createAsyncThunk('bundles/fetchBundles', async () => {
  const response = await axios.get('/api/bundles'); // Make sure backend is running and proxy set in package.json
  return response.data;
});

export const createBundle = createAsyncThunk('bundles/createBundle', async (bundleData) => {
  const response = await axios.post('/api/bundles', bundleData);
  return response.data;
});

const bundleSlice = createSlice({
  name: 'bundles',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBundles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBundles.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchBundles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createBundle.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default bundleSlice.reducer;
