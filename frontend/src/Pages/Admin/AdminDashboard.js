import React from 'react';
import AdminNavbar from '../../Components/Admin/Common/AdminNavbar';
import AdminOverviewCard from '../../Components/Admin/AdminOverviewCard';
import AdminOverviewChart from '../../Components/Admin/AdminOverviewChart';
import CustomerReviewsOverviewChart from '../../Components/Main/CustomerReviewsOverviewChart';
import AdminLatestTransactionsTable from '../../Components/Admin/AdminLatestTransactionsTable';
import AdminLatestReviewsTable from '../../Components/Admin/AdminLatestReviewsTable';
import AdminProductsPunched from '../../Components/Admin/AdminProductsPunched';
import AdminSidebar from '../../Components/Admin/Common/AdminSidebar'; // Sidebar component

const AdminDashboard = () => {
    const totalOrders = 1500;
    const successfulOrders = 1350;
    const cancelledOrders = 150;

    const successTrend = 'up';
    const cancelTrend = 'down';

    const latestTransactions = [
        { id: 'TXN12345', date: '2024-09-20', amount: 150.00, status: 'Completed' },
        { id: 'TXN12346', date: '2024-09-19', amount: 200.00, status: 'Pending' },
        { id: 'TXN12347', date: '2024-09-18', amount: 300.00, status: 'Cancelled' },
        { id: 'TXN12348', date: '2024-09-17', amount: 450.00, status: 'Completed' },
        { id: 'TXN12349', date: '2024-09-16', amount: 100.00, status: 'Completed' },
    ];

    const latestReviews = [
        { customer: 'John Doe', text: 'Great product!', rating: 5 },
        { customer: 'Jane Smith', text: 'Satisfactory.', rating: 3 },
        { customer: 'Paul Johnson', text: 'Not as expected.', rating: 2 },
        { customer: 'Mary Wilson', text: 'Excellent service!', rating: 5 },
        { customer: 'David Brown', text: 'Would not recommend.', rating: 1 },
    ];

    const products = [
        { name: 'Product 1', dateAdded: '2024-09-01', unitsSold: 120, stockStatus: 'In Stock', price: 29.99 },
        { name: 'Product 2', dateAdded: '2024-09-05', unitsSold: 75, stockStatus: 'Out of Stock', price: 19.99 },
        { name: 'Product 3', dateAdded: '2024-09-10', unitsSold: 200, stockStatus: 'In Stock', price: 49.99 },
        { name: 'Product 4', dateAdded: '2024-09-12', unitsSold: 30, stockStatus: 'In Stock', price: 15.49 },
    ];

    return (
        <div className="bg-gray-900 min-h-screen flex">
        {/* Sidebar - Adjusted to be fixed */}
        <AdminSidebar className="fixed h-screen" /> 

        {/* Main Content Area */}
        <div className="flex-1 ml-64 overflow-y-auto">
            <AdminNavbar />
            <AdminOverviewCard
                totalOrders={totalOrders}
                successfulOrders={successfulOrders}
                cancelledOrders={cancelledOrders}
                successTrend={successTrend}
                cancelTrend={cancelTrend}
            />

            {/* Updated Grid with adjusted margins and padding */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-8">
                {/* First Column - Charts */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="h-64">
                        <AdminOverviewChart />
                    </div>
                    <br />
                    <br />
                    <div className="h-64">
                        <CustomerReviewsOverviewChart />
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <AdminProductsPunched products={products} />
                </div>

                {/* Second Column - Tables */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
                        {/* <h2 className="text-white text-lg font-semibold mb-2">Latest Transactions</h2> */}
                        <AdminLatestTransactionsTable transactions={latestTransactions} />
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
                        {/* <h2 className="text-white text-lg font-semibold mb-2">Latest Reviews</h2> */}
                        <AdminLatestReviewsTable reviews={latestReviews} />
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default AdminDashboard;