import React, { Suspense, lazy, useEffect } from 'react'; // Add 'React' here
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from "./pages/auth"
import LoginPage from './pages/Login';
import { useDispatch } from "react-redux";
import { setUser } from "./pages/Redux/User/userslice";
import Protectedroute from "./pages/Protectedroute"
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Products = lazy(() => import('./pages/Products'));
const Transaction = lazy(() => import('./pages/Transaction'));
const Customers = lazy(() => import('./pages/Customers'));
const Settings = lazy(() => import('./pages/Settings'));
const Accounts = lazy(() => import('./pages/Accounts'));
const NewProduct = lazy(() => import('./pages/management/NewProduct'));
const ProductManagement = lazy(() => import('./pages/management/ProductManagement'));
const TransactionManagement = lazy(() => import('./pages/management/TransactionManagement'));
const CustomerManagement = lazy(() => import('./pages/management/CustomerManagement'));
const NewUser = lazy(() => import('./pages/management/NewUser'));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => { // make it async
      try {
        const user = await useAuth(); // await the promise
        dispatch(setUser(user));
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();

    return () => {};
  }, []);

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin/dashboard" element={
            <Protectedroute>
              <Dashboard />
            </Protectedroute>
          } />
          <Route path="/admin/product" element={
            <Protectedroute>
              <Products />
            </Protectedroute>} />
          <Route path="/admin/customer" element={
            <Protectedroute>
              <Customers />
            </Protectedroute>} />
          <Route path="/admin/transaction" element={
            <Protectedroute>
              <Transaction />
            </Protectedroute>
          } />
          <Route path="/admin/settings" element={
            <Protectedroute>
              <Settings />
            </Protectedroute>} />
          <Route path="/admin/accounts" element={
            <Protectedroute>
              <Accounts />
            </Protectedroute>} />
          <Route path="/admin/product/new/:id" element={
            <Protectedroute>
              <NewProduct />
            </Protectedroute>
          } />
          <Route path="/admin/product/:id" element={
            <Protectedroute>
              <ProductManagement />
            </Protectedroute>
          }
          />
          <Route path="/admin/transaction/:id" element={
            <Protectedroute>
              <TransactionManagement />
            </Protectedroute>
          } />
          <Route path="/admin/customer/:id" element={
            <Protectedroute>
              <CustomerManagement />
            </Protectedroute>
          }
          />
           <Route path="/admin/AddNewUser" element={
            <Protectedroute>
              <NewUser />
            </Protectedroute>
          } />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
