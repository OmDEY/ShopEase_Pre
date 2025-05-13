import React, { useState } from 'react';
import { FaTachometerAlt, FaBox, FaUsers, FaClipboardList, FaChartLine, FaCog, FaSignOutAlt, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState({
    products: false,
    promotions: false
  });

  const handleAdminLogout = () => {
    localStorage.clear();
    navigate('/auth');
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    hover: {
      scale: 1.02,
      backgroundColor: "rgba(74, 85, 104, 0.5)",
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.98
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: "auto",
      transition: {
        duration: 0.3
      }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white w-64 flex flex-col fixed shadow-xl border-r border-gray-700">
      {/* Logo with animation */}
      <motion.div 
        className="flex items-center justify-center h-20 shadow-md border-b border-gray-700"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
          ShopEase Admin
        </h1>
      </motion.div>

      {/* Scrollable menu */}
      <div className="flex-grow overflow-y-auto overflow-x-hidden custom-scrollbar">
        <ul className="space-y-2 p-4">
          <motion.li 
            onClick={() => navigate('/admin/adminDashboard')}
            variants={menuItemVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            className="p-3 rounded-lg flex items-center gap-4 cursor-pointer bg-opacity-20 hover:bg-opacity-50"
          >
            <FaTachometerAlt className="text-purple-400 text-lg" />
            <span className="font-medium">Dashboard</span>
          </motion.li>

          {/* Products Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={menuItemVariants}
          >
            <div 
              onClick={() => toggleSection('products')}
              className="p-3 rounded-lg flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-700"
            >
              <div className="flex items-center gap-4">
                <FaBox className="text-blue-400 text-lg" />
                <span className="font-medium">Products</span>
              </div>
              {expandedSections.products ? <FaChevronDown className="text-xs" /> : <FaChevronRight className="text-xs" />}
            </div>

            <AnimatePresence>
              {expandedSections.products && (
                <motion.ul
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="ml-12 space-y-2 mt-2"
                >
                  <motion.li 
                    onClick={() => navigate('/admin/adminProducts')}
                    variants={menuItemVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="p-2 rounded-lg cursor-pointer text-sm hover:bg-gray-700"
                  >
                    All Products
                  </motion.li>
                  <motion.li 
                    onClick={() => navigate('/admin/adminCategoryProducts')}
                    variants={menuItemVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="p-2 rounded-lg cursor-pointer text-sm hover:bg-gray-700"
                  >
                    Categories
                  </motion.li>
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.li 
            onClick={() => navigate('/admin/adminCustomers')}
            variants={menuItemVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            className="p-3 rounded-lg flex items-center gap-4 cursor-pointer"
          >
            <FaUsers className="text-green-400 text-lg" />
            <span className="font-medium">Customers</span>
          </motion.li>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={menuItemVariants}
          >
            <div 
              onClick={() => toggleSection('orders')}
              className="p-3 rounded-lg flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-700"
            >
              <div className="flex items-center gap-4">
                <FaClipboardList className="text-yellow-400 text-lg" />
                <span className="font-medium">Orders</span>
              </div>
              {expandedSections.orders ? <FaChevronDown className="text-xs" /> : <FaChevronRight className="text-xs" />}
            </div>

            <AnimatePresence>
              {expandedSections.orders && (
                <motion.ul
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="ml-12 space-y-2 mt-2"
                >
                  <motion.li 
                    onClick={() => navigate('/admin/adminOrders')}
                    variants={menuItemVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="p-2 rounded-lg cursor-pointer text-sm hover:bg-gray-700"
                  >
                    All Orders
                  </motion.li>
                  <motion.li 
                    onClick={() => navigate('/admin/adminReturns')}
                    variants={menuItemVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="p-2 rounded-lg cursor-pointer text-sm hover:bg-gray-700"
                  >
                    Returns
                  </motion.li>
                  <motion.li 
                    onClick={() => navigate('/admin/adminCancelledOrders')}
                    variants={menuItemVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="p-2 rounded-lg cursor-pointer text-sm hover:bg-gray-700"
                  >
                    Cancelled Orders
                  </motion.li>
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Promotions Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={menuItemVariants}
          >
            <div 
              onClick={() => toggleSection('promotions')}
              className="p-3 rounded-lg flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-700"
            >
              <div className="flex items-center gap-4">
                <FaChartLine className="text-pink-400 text-lg" />
                <span className="font-medium">Promotions</span>
              </div>
              {expandedSections.promotions ? <FaChevronDown className="text-xs" /> : <FaChevronRight className="text-xs" />}
            </div>

            <AnimatePresence>
              {expandedSections.promotions && (
                <motion.ul
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="ml-12 space-y-2 mt-2"
                >
                  <motion.li 
                    onClick={() => navigate('/admin/dealOfTheDay')}
                    variants={menuItemVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="p-2 rounded-lg cursor-pointer text-sm hover:bg-gray-700"
                  >
                    Deal of the Day
                  </motion.li>
                  <motion.li 
                    onClick={() => navigate('/admin/weekendSpecial')}
                    variants={menuItemVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="p-2 rounded-lg cursor-pointer text-sm hover:bg-gray-700"
                  >
                    Weekend Special
                  </motion.li>
                  <motion.li 
                    onClick={() => navigate('/admin/clearanceSale')}
                    variants={menuItemVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="p-2 rounded-lg cursor-pointer text-sm hover:bg-gray-700"
                  >
                    Clearance Sale
                  </motion.li>
                  <motion.li 
                    onClick={() => navigate('/admin/bundleOffer')}
                    variants={menuItemVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="p-2 rounded-lg cursor-pointer text-sm hover:bg-gray-700"
                  >
                    Bundle Offer
                  </motion.li>
                  <motion.li 
                    onClick={() => navigate('/admin/featuredProducts')}
                    variants={menuItemVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="p-2 rounded-lg cursor-pointer text-sm hover:bg-gray-700"
                  >
                    Featured Products
                  </motion.li>
                  <motion.li 
                    onClick={() => navigate('/admin/popularProductsAdd')}
                    variants={menuItemVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="p-2 rounded-lg cursor-pointer text-sm hover:bg-gray-700"
                  >
                    Popular Products
                  </motion.li>
                  <motion.li 
                    onClick={() => navigate('/admin/dailyBestSales')}
                    variants={menuItemVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="p-2 rounded-lg cursor-pointer text-sm hover:bg-gray-700"
                  >
                    Daily Best Sales
                  </motion.li>
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>

          {/* <motion.li 
            onClick={() => navigate('/admin/adminSettings')}
            variants={menuItemVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            className="p-3 rounded-lg flex items-center gap-4 cursor-pointer"
          >
            <FaCog className="text-gray-400 text-lg" />
            <span className="font-medium">Settings</span>
          </motion.li> */}
        </ul>
      </div>

      {/* Logout button with animation */}
      <motion.div 
        className="p-4 border-t border-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div 
          onClick={handleAdminLogout}
          className="hover:bg-red-600 p-3 rounded-lg flex items-center gap-4 cursor-pointer transition-colors duration-200"
          whileHover={{ 
            scale: 1.02,
            backgroundColor: "rgba(220, 38, 38, 0.8)"
          }}
          whileTap={{ scale: 0.98 }}
        >
          <FaSignOutAlt className="text-red-300" />
          <span className="font-medium">Logout</span>
        </motion.div>
      </motion.div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
};

export default AdminSidebar;