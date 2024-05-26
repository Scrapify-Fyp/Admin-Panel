import { Suspense, lazy } from 'react';
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { RootState } from './pages/Redux/store';
// import { selectUser } from './pages/Redux/authSlice'; // Import selectUser from your authSlice
import { auth } from "./pages/auth"
import LoginPage from './pages/Login';
import { useDispatch } from "react-redux";
import { setUser } from "./pages/Redux/User/userslice";
import Protectedroute from "./pages/Protectedroute"
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Products = lazy(() => import('./pages/Products'));
const Transaction = lazy(() => import('./pages/Transaction'));
const Customers = lazy(() => import('./pages/Customers'));
const NewProduct = lazy(() => import('./pages/management/NewProduct'));
const ProductManagement = lazy(() => import('./pages/management/ProductManagement'));
const TransactionManagement = lazy(() => import('./pages/management/TransactionManagement'));

function App() {
  // const user = useSelector((state: RootState) => selectUser(state)); 
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = () => {
      try {
        const user = auth();
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
            </Protectedroute>} />
            <Route path="/admin/product/new" element={
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
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
