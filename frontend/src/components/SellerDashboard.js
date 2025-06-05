import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBundle, fetchBundles } from '../redux/bundleSlice';

const SellerDashboard = () => {
  const dispatch = useDispatch();
  const bundles = useSelector(state => state.bundles.items);
  const [form] = useState({ title: '', description: '', products: [] });

  useEffect(() => {
    dispatch(fetchBundles());
  }, [dispatch]);

  const handleSubmit = () => {
    dispatch(createBundle(form));
  };

  return (
    <div>
      <h2>Create Bundle</h2>
      {/* Input fields for title, description, products */}
      <button onClick={handleSubmit}>Create</button>
      <div>
        <h3>Bundles</h3>
        {bundles.map(bundle => (
          <div key={bundle._id}>{bundle.title}</div>
        ))}
      </div>
    </div>
  );
};

export default SellerDashboard;
