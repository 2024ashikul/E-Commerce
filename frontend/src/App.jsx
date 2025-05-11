
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from '../pages/layout';
import ProductDetails from '../pages/ProductDetails';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route path="/product" element={<ProductDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
