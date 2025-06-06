// MainRoutes.js
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../Pages/Main/HomePage';
import ProductListingPage from '../Pages/Main/ProductListingPage';
import SingleProductDisplay from '../Pages/Main/SingleProduct';
import CartPage from '../Pages/Main/CartPage';
import OrdersPage from '../Pages/Main/OrdersPage';
import CheckoutPage from '../Pages/Main/CheckoutPage';
import AuthPage from '../Pages/Main/AuthPage';
import UserDetailsPage from '../Pages/Main/UserDetailsPage';
import AdminAuthPage from '../Pages/Main/AdminAuthPage';
import ProtectedRoute from './ProtectedRoute';
import { SearchContext } from '../Context/ContextProvider';
import ProfilePage from '../Pages/Main/ProfilePage';
import ComparisonTablePage from '../Pages/Main/ComparisonTablePage';
import WishListPage from '../Pages/Main/WishListPage';
import SuccessPage from '../Pages/Main/SuccessPage';
import FailedPage from '../Pages/Main/FailedPage';
import NewArraivalsPage from '../Pages/Main/NewArraivalsPage';
import BestSellersPage from '../Pages/Main/BestSellersPage';
import DiscountDealsPage from '../Pages/Main/DiscountDealsPage';
import DealsOfTheDay from '../Pages/Main/DealsOfTheDay';
import FeaturedPage from '../Pages/Main/FeaturedPage';
import WeekendSpecialsPage from '../Pages/Main/WeekendSpecialsPage';
import ClearanceSalePage from '../Pages/Main/ClearanceSalePage';
import BundleOffersPage from '../Pages/Main/BundleOffersPage ';
import AboutUsPage from '../Pages/Main/AboutUsPage';
import ContactUsPage from '../Pages/Main/ContactUsPage';
import PrivacyPolicyPage from '../Pages/Main/PrivacyPolicyPage';
import TermsAndConditionsPage from '../Pages/Main/TermsAndConditionsPage';

const MainRoutes = () => {
  const { isAuthenticated } = useContext(SearchContext);

  return (
    <Routes>
      <Route path="/auth" element={isAuthenticated ? <Navigate to="/" /> : <AuthPage />} />
      <Route path="/auth/userDetails" element={isAuthenticated ? <Navigate to="/" /> : <UserDetailsPage />} />
      <Route path="/auth/admin" element={isAuthenticated ? <Navigate to="/" /> : <AdminAuthPage />} />
      <Route path="/" element={<HomePage />} />

      {/* Protected Routes */}
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/comparison" element={<ProtectedRoute><ComparisonTablePage /></ProtectedRoute>} />
      <Route path="/wishlist" element={<ProtectedRoute><WishListPage /></ProtectedRoute>} />
      <Route path="/products" element={<ProtectedRoute><ProductListingPage /></ProtectedRoute>} />
      <Route path="/product" element={<ProtectedRoute><SingleProductDisplay /></ProtectedRoute>} />
      <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
      <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
      <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
      <Route path="/payment-success" element={<ProtectedRoute><SuccessPage /></ProtectedRoute>} />
      <Route path="/payment-failed" element={<ProtectedRoute><FailedPage /></ProtectedRoute>} />
      <Route path="/new-arrivals" element={<ProtectedRoute><NewArraivalsPage /></ProtectedRoute>} />
      <Route path="/best-sellers" element={<ProtectedRoute><BestSellersPage /></ProtectedRoute>} />
      <Route path="/discount-deals" element={<ProtectedRoute><DiscountDealsPage /></ProtectedRoute>} />
      <Route path="/deals-of-the-day" element={<ProtectedRoute><DealsOfTheDay /></ProtectedRoute>} />
      <Route path="/featured-products" element={<ProtectedRoute><FeaturedPage /></ProtectedRoute>} />
      <Route path="/weekend-specials" element={<ProtectedRoute><WeekendSpecialsPage /></ProtectedRoute>} />
      <Route path="/clearance-sale" element={<ProtectedRoute><ClearanceSalePage /></ProtectedRoute>} />
      <Route path="/bundle-offers" element={<ProtectedRoute><BundleOffersPage /></ProtectedRoute>} />
      <Route path="/about" element={<ProtectedRoute><AboutUsPage /></ProtectedRoute>} />
      <Route path="/contact" element={<ProtectedRoute><ContactUsPage /></ProtectedRoute>} />
      <Route path="/privacy-policy" element={<ProtectedRoute><PrivacyPolicyPage /></ProtectedRoute>} />
      <Route path="/terms-conditions" element={<ProtectedRoute><TermsAndConditionsPage /></ProtectedRoute>} />
    </Routes>
  );
};

export default MainRoutes;