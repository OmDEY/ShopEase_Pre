// AdminRoutes.js
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from '../Pages/Admin/AdminDashboard';
import AdminProducts from '../Pages/Admin/AdminProducts';
import AdminCustomers from '../Pages/Admin/AdminCustomers';
import AdminOrders from '../Pages/Admin/AdminOrders';
import AdminCategoryProductsPage from '../Pages/Admin/AdminCategoryProductsPage';
import ProtectedRoute from './ProtectedRoute';
import { SearchContext } from '../Context/ContextProvider';

const AdminRoutes = () => {
  const { isAdmin } = useContext(SearchContext);
  return isAdmin ? (
    <ProtectedRoute adminOnly>
      <Routes>
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/adminProducts" element={<AdminProducts />} />
        <Route path="/adminCustomers" element={<AdminCustomers />} />
        <Route path="/adminOrders" element={<AdminOrders />} />
        <Route path="/adminCategoryProducts" element={<AdminCategoryProductsPage />} />
      </Routes>
    </ProtectedRoute>
  ) : <Navigate to="/auth" />;
};

export default AdminRoutes;