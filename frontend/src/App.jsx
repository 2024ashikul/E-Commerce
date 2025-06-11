import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import HomePage from '../pages/HomePage';
import NavBar from './components/NavBar';
import Profile from '../pages/Profile';
import PrivateRoute from './components/PrivateRouter';
import AddProduct from '../pages/AddProduct';
import ProductPage from '../pages/ProductPage';
import CategoryPage from '../pages/CategoryPage';
import SendMail from './components/SendMail';
import Layout from './components/Layout';
import SearchResults from '../pages/SearchResults';

export default function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route element={<Layout />} >
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/profile' element={<PrivateRoute> <Profile /> </PrivateRoute>} />
          <Route path='/addproduct' element = {<AddProduct></AddProduct>} />
          <Route path='/product/:id' element = {<ProductPage></ProductPage>} />
          <Route path='/c/:category' element = {<CategoryPage></CategoryPage>} />
          <Route path='/sendmail' element = {<SendMail></SendMail>} />
          <Route path='/search/:value' element = {<SearchResults></SearchResults>} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}
