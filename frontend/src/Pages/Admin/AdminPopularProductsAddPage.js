import React from "react";
import AdminSidebar from "../../Components/Admin/Common/AdminSidebar";
import AdminNavbar from "../../Components/Admin/Common/AdminNavbar";
import AdminAddPopularProduct from "../../Components/Admin/AdminPopularProductsAdd";

const AdminPopularProductsAddPage = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex">
      {/* Sidebar - Adjusted to be fixed */}
      <AdminSidebar className="fixed h-screen" />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 overflow-y-auto">
        <AdminNavbar />
        <div className="p-4">
          {" "}
          {/* Added padding and space between components */}
          <AdminAddPopularProduct />
        </div>
      </div>
    </div>
  );
};

export default AdminPopularProductsAddPage;
