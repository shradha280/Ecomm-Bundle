import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SellerDashboard from '../SellerDashboard';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// Mock actions
jest.mock('../../redux/bundleSlice', () => ({
  fetchBundles: () => ({ type: 'FETCH_BUNDLES' }),
  createBundle: (form) => ({ type: 'CREATE_BUNDLE', payload: form }),
}));

const mockStore = configureStore([thunk]);

describe('SellerDashboard', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      bundles: {
        items: [
          { _id: '1', title: 'Test Bundle 1' },
          { _id: '2', title: 'Test Bundle 2' },
        ],
      },
    });

    store.dispatch = jest.fn();
  });

  test('renders heading and bundles list', () => {
    render(
      <Provider store={store}>
        <SellerDashboard />
      </Provider>
    );

    expect(screen.getByText('Create Bundle')).toBeInTheDocument();
    expect(screen.getByText('Test Bundle 1')).toBeInTheDocument();
    expect(screen.getByText('Test Bundle 2')).toBeInTheDocument();
  });

  test('calls dispatch on Create button click', () => {
    render(
      <Provider store={store}>
        <SellerDashboard />
      </Provider>
    );

    const button = screen.getByText('Create');
    fireEvent.click(button);

    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'CREATE_BUNDLE',
      payload: { title: '', description: '', products: [] },
    });
  });
});
