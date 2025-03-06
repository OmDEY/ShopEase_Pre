import React from 'react'
import AdminSidebar from '../../Components/Admin/Common/AdminSidebar'
import AdminNavbar from '../../Components/Admin/Common/AdminNavbar'
import AdminProductPunching from '../../Components/Admin/AdminProductPunching'
import AdminProductsTable from '../../Components/Admin/AdminProductsTable'
import { useState, useEffect } from 'react';
const AdminProducts = () => {

    const [products, setProducts] = useState([]);

    // const products = [
    //     {
    //         id: 1,
    //         title: 'Smartphone',
    //         description: 'A high-quality smartphone with amazing features.',
    //         price: 999.99,
    //         stock: 20,
    //         category: 'electronics',
    //     },
    //     {
    //         id: 2,
    //         title: 'Gaming Chair',
    //         description: 'Ergonomic chair with lumbar support.',
    //         price: 199.99,
    //         stock: 50,
    //         category: 'furniture',
    //     },
    //     // Add more products here
    // ];

    return (
        <div className="bg-gray-900 min-h-screen flex">
            {/* Sidebar - Adjusted to be fixed */}
            <AdminSidebar className="fixed h-screen" /> 

            {/* Main Content Area */}
            <div className="flex-1 ml-64 overflow-y-auto">
                <AdminNavbar />
                <div className="p-4"> {/* Added padding and space between components */}
                    <AdminProductPunching />
                    <AdminProductsTable />
                </div>
            </div>
        </div>
    )
}

export default AdminProducts