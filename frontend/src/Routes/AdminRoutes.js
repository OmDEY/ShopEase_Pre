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
import AdminDealOfTheDayPage from '../Pages/Admin/AdminDealOfTheDayPage';
import AdminWeekendSpecialPage from '../Pages/Admin/AdminWeekendSpecialPage';
import AdminClearanceSalePage from '../Pages/Admin/AdminClearanceSalePage';
import AdminBundleOffersPage from '../Pages/Admin/AdminBundleOffersPage';

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
        <Route path="/dealOfTheDay" element={<AdminDealOfTheDayPage />} />
        <Route path="/weekendSpecial" element={<AdminWeekendSpecialPage />} />
        <Route path="/clearanceSale" element={<AdminClearanceSalePage />} />
        <Route path="/bundleOffer" element={<AdminBundleOffersPage/>} />
      </Routes>
    </ProtectedRoute>
  ) : 
    <Navigate to="/auth" />;
};

export default AdminRoutes;