import React, { useState } from 'react';
import AdminNavbar from '../../Components/Admin/Common/AdminNavbar';
import AdminSidebar from '../../Components/Admin/Common/AdminSidebar';
import AdminCategoryProducts from '../../Components/Admin/AdminCategoryProducts';

const AdminCategoryProductsPage = () => {

    return (
        <div className="bg-gray-900 min-h-screen flex">
            <AdminSidebar />
            <div className="flex-1 ml-64 overflow-y-auto">
                <AdminNavbar />

                <AdminCategoryProducts />
            </div>
        </div>
    );
};

export default AdminCategoryProductsPage;
