import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './pages/Redux/store';
import { selectUser } from './pages/Redux/authSlice'; // Import selectUser from your authSlice

import LoginPage from './pages/Login';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Products = lazy(() => import('./pages/Products'));
const Transaction = lazy(() => import('./pages/Transaction'));
const Customers = lazy(() => import('./pages/Customers'));
const NewProduct = lazy(() => import('./pages/management/NewProduct'));
const ProductManagement = lazy(() => import('./pages/management/ProductManagement'));
const TransactionManagement = lazy(() => import('./pages/management/TransactionManagement'));

function App() {
  const user = useSelector((state: RootState) => selectUser(state)); // Use selectUser directly in useSelector
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
        {!user ? (
          <Route path="/admin/login" element={<LoginPage />} />
        ) : (
          <>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/product" element={<Products />} />
            <Route path="/admin/customer" element={<Customers />} />
            <Route path="/admin/transaction" element={<Transaction />} />
            <Route path="/admin/product/new" element={<NewProduct />} />
            <Route path="/admin/product/:id" element={<ProductManagement />} />
            <Route path="/admin/transaction/:id" element={<TransactionManagement />} />
          </>
        )}

        
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
