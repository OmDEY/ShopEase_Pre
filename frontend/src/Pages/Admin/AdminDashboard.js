import React from "react";
import { motion } from "framer-motion";
import AdminNavbar from "../../Components/Admin/Common/AdminNavbar";
import AdminOverviewCard from "../../Components/Admin/AdminOverviewCard";
import AdminOverviewChart from "../../Components/Admin/AdminOverviewChart";
import CustomerReviewsOverviewChart from "../../Components/Main/CustomerReviewsOverviewChart";
import AdminLatestTransactionsTable from "../../Components/Admin/AdminLatestTransactionsTable";
import AdminLatestReviewsTable from "../../Components/Admin/AdminLatestReviewsTable";
import AdminProductsPunched from "../../Components/Admin/AdminProductsPunched";
import AdminSidebar from "../../Components/Admin/Common/AdminSidebar";

const AdminDashboard = () => {
  const totalOrders = 1500;
  const successfulOrders = 1350;
  const cancelledOrders = 150;

  const successTrend = "up";
  const cancelTrend = "down";

  const latestTransactions = [
    { id: "TXN12345", date: "2024-09-20", amount: 150.0, status: "Completed" },
    { id: "TXN12346", date: "2024-09-19", amount: 200.0, status: "Pending" },
    { id: "TXN12347", date: "2024-09-18", amount: 300.0, status: "Cancelled" },
    { id: "TXN12348", date: "2024-09-17", amount: 450.0, status: "Completed" },
    { id: "TXN12349", date: "2024-09-16", amount: 100.0, status: "Completed" },
  ];

  const latestReviews = [
    { customer: "John Doe", text: "Great product!", rating: 5 },
    { customer: "Jane Smith", text: "Satisfactory.", rating: 3 },
    { customer: "Paul Johnson", text: "Not as expected.", rating: 2 },
    { customer: "Mary Wilson", text: "Excellent service!", rating: 5 },
    { customer: "David Brown", text: "Would not recommend.", rating: 1 },
  ];

  const products = [
    {
      name: "Product 1",
      dateAdded: "2024-09-01",
      unitsSold: 120,
      stockStatus: "In Stock",
      price: 29.99,
    },
    {
      name: "Product 2",
      dateAdded: "2024-09-05",
      unitsSold: 75,
      stockStatus: "Out of Stock",
      price: 19.99,
    },
    {
      name: "Product 3",
      dateAdded: "2024-09-10",
      unitsSold: 200,
      stockStatus: "In Stock",
      price: 49.99,
    },
    {
      name: "Product 4",
      dateAdded: "2024-09-12",
      unitsSold: 30,
      stockStatus: "In Stock",
      price: 15.49,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen flex">
      <AdminSidebar className="fixed h-screen" />

      <div className="flex-1 ml-64 overflow-y-auto">
        <AdminNavbar />

        <motion.div
          className="px-8 pt-8 pb-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Overview Cards */}
          <motion.div variants={itemVariants}>
            <AdminOverviewCard
              totalOrders={totalOrders}
              successfulOrders={successfulOrders}
              cancelledOrders={cancelledOrders}
              successTrend={successTrend}
              cancelTrend={cancelTrend}
            />
          </motion.div>

          {/* Main Content Grid */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8"
            variants={containerVariants}
          >
            {/* Left Column - Charts */}
            <div className="lg:col-span-2 space-y-6">
              {/* Chart Containers */}
              <motion.div
                variants={itemVariants}
                className="relative h-80 w-full overflow-hidden rounded-2xl shadow-lg"
              >
                <div className="absolute inset-0">
                  <AdminOverviewChart />
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="relative h-80 w-full overflow-hidden rounded-2xl shadow-lg"
              >
                <div className="absolute inset-0">
                  <CustomerReviewsOverviewChart />
                </div>
              </motion.div>

              {/* Products Table Container */}
              <motion.div
                variants={itemVariants}
                className="w-full overflow-hidden rounded-2xl shadow-lg"
              >
                <AdminProductsPunched products={products} />
              </motion.div>
            </div>

            {/* Right Column - Tables */}
            <div className="lg:col-span-1 space-y-6">
              <motion.div variants={itemVariants}>
                <AdminLatestTransactionsTable
                  transactions={latestTransactions}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <AdminLatestReviewsTable reviews={latestReviews} />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
