import { configureStore } from '@reduxjs/toolkit';
import bundleReducer from './bundleSlice';

const store = configureStore({
  reducer: {
    bundles: bundleReducer,
  },
});

export default store;
