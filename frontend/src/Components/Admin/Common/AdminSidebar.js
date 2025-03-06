import React from 'react';
import { FaTachometerAlt, FaBox, FaUsers, FaClipboardList, FaChartLine, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleAdminLogout = () => {
    localStorage.clear();
    navigate('/auth')
  };

  return (
    <div className="h-screen bg-gray-800 text-white w-64 flex flex-col fixed">
      <div className="flex items-center justify-center h-20 shadow-md">
        <h1 className="text-2xl font-semibold">ShopEase</h1>
      </div>

      {/* Make the middle section scrollable */}
      <div className="flex-grow overflow-y-auto">
        <ul className="space-y-4 p-6">
          <li onClick={() => navigate('/admin/adminDashboard')} className="hover:bg-gray-700 p-3 rounded-lg flex items-center gap-4 cursor-pointer">
            <FaTachometerAlt />
            <span>Dashboard</span>
          </li>
          <li onClick={() => navigate('/admin/adminProducts')} className="hover:bg-gray-700 p-3 rounded-lg flex items-center gap-4 cursor-pointer">
            <FaBox />
            <span>Products</span>
          </li>
          <li onClick={() => navigate('/admin/adminCustomers')} className="hover:bg-gray-700 p-3 rounded-lg flex items-center gap-4 cursor-pointer">
            <FaUsers />
            <span>Customers</span>
          </li>
          <li onClick={() => navigate('/admin/adminOrders')} className="hover:bg-gray-700 p-3 rounded-lg flex items-center gap-4 cursor-pointer">
            <FaClipboardList />
            <span>Orders</span>
          </li>
          <li onClick={() => navigate('/admin/adminCategoryProducts')} className="hover:bg-gray-700 p-3 rounded-lg flex items-center gap-4 cursor-pointer">
            <FaChartLine />
            <span>Categories</span>
          </li>
          <li onClick={() => navigate('/admin/adminSettings')} className="hover:bg-gray-700 p-3 rounded-lg flex items-center gap-4 cursor-pointer">
            <FaCog />
            <span>Settings</span>
          </li>
        </ul>
      </div>

      <div className="p-6">
        <div className="hover:bg-gray-700 p-3 rounded-lg flex items-center gap-4 cursor-pointer">
          <FaSignOutAlt />
          <span onClick={handleAdminLogout}>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;