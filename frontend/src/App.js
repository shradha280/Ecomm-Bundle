import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBundles, createBundle } from './redux/bundleSlice';

const SellerDashboard = () => {
  const dispatch = useDispatch();
  const bundles = useSelector((state) => state.bundles.items);
  const loading = useSelector((state) => state.bundles.loading);
  const error = useSelector((state) => state.bundles.error);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // For demo: hardcoded 2 products in bundle
  const [products] = useState([
    { productId: 'p1', price: 100, onSale: false, salePrice: 0 },
    { productId: 'p2', price: 200, onSale: true, salePrice: 150 },
  ]);

  useEffect(() => {
    dispatch(fetchBundles());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (products.length < 2) {
      alert('Bundle must have at least 2 products');
      return;
    }

    dispatch(createBundle({ title, description, products }));

    setTitle('');
    setDescription('');
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        <div>
          <label>
            Bundle Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ width: '100%', padding: 8, marginTop: 4 }}
            />
          </label>
        </div>
        <div style={{ marginTop: 10 }}>
          <label>
            Bundle Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{ width: '100%', padding: 8, marginTop: 4 }}
            />
          </label>
        </div>

        {/* For simplicity, fixed 2 products; you can later add UI to add/edit products */}

        <button
          type="submit"
          style={{ marginTop: 15, padding: '8px 16px', cursor: 'pointer' }}
        >
          Create Bundle
        </button>
      </form>

      <h2>Existing Bundles</h2>
      {loading && <p>Loading bundles...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {!loading && bundles.length === 0 && <p>No bundles created yet.</p>}
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {bundles.map((bundle) => (
          <li
            key={bundle._id}
            style={{
              border: '1px solid #ccc',
              borderRadius: 5,
              padding: 10,
              marginBottom: 10,
            }}
          >
            <strong>{bundle.title}</strong>
            <p>{bundle.description}</p>
            <p>
              Products: {bundle.products.length} | Discount applied: 10%
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SellerDashboard;
