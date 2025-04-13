import { useState, useRef, useEffect } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCreditCard,
  FiHeart,
  FiShoppingBag,
  FiSettings,
  FiSun,
  FiMoon,
  FiEdit,
  FiTrash2,
  FiPlus,
} from "react-icons/fi";
import { fetchUserById, addShippingAddress } from "../../services/api";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [profilePic, setProfilePic] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
  });
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Home",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "USA",
      isDefault: true,
    },
    {
      id: 2,
      type: "Work",
      street: "456 Business Ave",
      city: "New York",
      state: "NY",
      postalCode: "10005",
      country: "USA",
      isDefault: false,
    },
  ]);
  const [orders, setOrders] = useState([
    {
      id: 1001,
      date: "2023-05-15",
      total: 125.99,
      status: "Delivered",
      items: 3,
    },
    { id: 1002, date: "2023-06-22", total: 89.5, status: "Shipped", items: 2 },
    {
      id: 1003,
      date: "2023-07-10",
      total: 210.75,
      status: "Processing",
      items: 5,
    },
  ]);
  const [wishlist, setWishlist] = useState([
    {
      id: 2001,
      name: "Wireless Headphones",
      price: 99.99,
      image: "https://via.placeholder.com/80",
    },
    {
      id: 2002,
      name: "Smart Watch",
      price: 199.99,
      image: "https://via.placeholder.com/80",
    },
    {
      id: 2003,
      name: "Bluetooth Speaker",
      price: 59.99,
      image: "https://via.placeholder.com/80",
    },
  ]);
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 3001, type: "Visa", last4: "4242", expiry: "12/25", isDefault: true },
    {
      id: 3002,
      type: "Mastercard",
      last4: "5555",
      expiry: "06/24",
      isDefault: false,
    },
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    isDefault: false,
  });
  const [showAddressForm, setShowAddressForm] = useState(false);
  const fileInputRef = useRef(null);

  const fetchUserData = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await fetchUserById(userId);
      const shipping = response.data.shippingAddress;

      if (shipping) {
        setAddresses([
          {
            id: Math.floor(Math.random() * 1000000) + 1, // Generate a random ID between 1 and 1,000,000
            type: "Home",
            street: shipping.addressLine1 || 'NA',
            city: shipping.city,
            state: shipping.state,
            postalCode: shipping.postalCode,
            country: shipping.country || "India", // add a default or fetched value
            phoneNumber: response.data.phoneNumber,
            isDefault: true,
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const handleAddAddress = async () => {
    console.log('newAddress >>', newAddress)

    try {
      // Send new address to backend
      const response = await addShippingAddress(newAddress);

      toast.success("Address added successfully!");
      fetchUserData();
      setNewAddress({
        type: "",
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        isDefault: false,
      });
      setShowAddressForm(false);
    } catch (error) {
      console.error("Add address error:", error);
      toast.error("Something went wrong while adding the address.");
    }
  };

  const handleSetDefaultAddress = (id) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const handleDeleteAddress = (id) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  const handleDeletePaymentMethod = (id) => {
    setPaymentMethods((prev) => prev.filter((pm) => pm.id !== id));
  };

  const handleSetDefaultPayment = (id) => {
    setPaymentMethods((prev) =>
      prev.map((pm) => ({
        ...pm,
        isDefault: pm.id === id,
      }))
    );
  };

  const handleRemoveFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Account</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${
              darkMode
                ? "bg-gray-700 text-yellow-300"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div
            className={`w-full md:w-64 p-6 rounded-lg ${
              darkMode ? "bg-gray-800" : "bg-white"
            } shadow-md`}
          >
            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-indigo-500">
                  {profilePic ? (
                    <img
                      src={profilePic}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <FiUser size={32} className="text-gray-500" />
                    </div>
                  )}
                </div>
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition"
                >
                  <FiEdit size={16} />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleProfilePicChange}
                  className="hidden"
                  accept="image/*"
                />
              </div>
              <h2 className="text-xl font-semibold">{userInfo.name}</h2>
              <p className="text-sm opacity-75">{userInfo.email}</p>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition ${
                  activeTab === "profile"
                    ? "bg-indigo-100 text-indigo-700"
                    : "hover:bg-gray-100"
                } ${
                  darkMode && activeTab === "profile"
                    ? "bg-indigo-900 text-indigo-100"
                    : ""
                } ${
                  darkMode && activeTab !== "profile" ? "hover:bg-gray-700" : ""
                }`}
              >
                <FiUser size={18} />
                <span>Profile</span>
              </button>
              <button
                onClick={() => setActiveTab("addresses")}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition ${
                  activeTab === "addresses"
                    ? "bg-indigo-100 text-indigo-700"
                    : "hover:bg-gray-100"
                } ${
                  darkMode && activeTab === "addresses"
                    ? "bg-indigo-900 text-indigo-100"
                    : ""
                } ${
                  darkMode && activeTab !== "addresses"
                    ? "hover:bg-gray-700"
                    : ""
                }`}
              >
                <FiMapPin size={18} />
                <span>Addresses</span>
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition ${
                  activeTab === "orders"
                    ? "bg-indigo-100 text-indigo-700"
                    : "hover:bg-gray-100"
                } ${
                  darkMode && activeTab === "orders"
                    ? "bg-indigo-900 text-indigo-100"
                    : ""
                } ${
                  darkMode && activeTab !== "orders" ? "hover:bg-gray-700" : ""
                }`}
              >
                <FiShoppingBag size={18} />
                <span>Orders</span>
              </button>
              <button
                onClick={() => setActiveTab("wishlist")}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition ${
                  activeTab === "wishlist"
                    ? "bg-indigo-100 text-indigo-700"
                    : "hover:bg-gray-100"
                } ${
                  darkMode && activeTab === "wishlist"
                    ? "bg-indigo-900 text-indigo-100"
                    : ""
                } ${
                  darkMode && activeTab !== "wishlist"
                    ? "hover:bg-gray-700"
                    : ""
                }`}
              >
                <FiHeart size={18} />
                <span>Wishlist</span>
              </button>
              <button
                onClick={() => setActiveTab("payments")}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition ${
                  activeTab === "payments"
                    ? "bg-indigo-100 text-indigo-700"
                    : "hover:bg-gray-100"
                } ${
                  darkMode && activeTab === "payments"
                    ? "bg-indigo-900 text-indigo-100"
                    : ""
                } ${
                  darkMode && activeTab !== "payments"
                    ? "hover:bg-gray-700"
                    : ""
                }`}
              >
                <FiCreditCard size={18} />
                <span>Payment Methods</span>
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition ${
                  activeTab === "settings"
                    ? "bg-indigo-100 text-indigo-700"
                    : "hover:bg-gray-100"
                } ${
                  darkMode && activeTab === "settings"
                    ? "bg-indigo-900 text-indigo-100"
                    : ""
                } ${
                  darkMode && activeTab !== "settings"
                    ? "hover:bg-gray-700"
                    : ""
                }`}
              >
                <FiSettings size={18} />
                <span>Account Settings</span>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div
                className={`p-6 rounded-lg shadow-md ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">
                    Personal Information
                  </h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center space-x-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                      <FiEdit size={16} />
                      <span>Edit</span>
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>

                {isEditing ? (
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={userInfo.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={userInfo.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={userInfo.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <FiUser size={20} className="text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-medium">{userInfo.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <FiMail size={20} className="text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{userInfo.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <FiPhone size={20} className="text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Phone Number</p>
                        <p className="font-medium">{userInfo.phone}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div
                className={`p-6 rounded-lg shadow-md ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">My Addresses</h2>
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="flex items-center space-x-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    <FiPlus size={16} />
                    <span>Add New Address</span>
                  </button>
                </div>

                {showAddressForm && (
                  <div
                    className={`mb-8 p-6 rounded-lg ${
                      darkMode ? "bg-gray-700" : "bg-gray-50"
                    }`}
                  >
                    <h3 className="text-lg font-medium mb-4">
                      Add New Address
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Address Type
                        </label>
                        <select
                          name="type"
                          value={newAddress.type}
                          onChange={handleAddressInputChange}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="">Select Type</option>
                          <option value="Home">Home</option>
                          <option value="Work">Work</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Street Address
                        </label>
                        <input
                          type="text"
                          name="street"
                          value={newAddress.street}
                          onChange={handleAddressInputChange}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={newAddress.city}
                          onChange={handleAddressInputChange}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          State/Province
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={newAddress.state}
                          onChange={handleAddressInputChange}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          postalCode/Postal Code
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          value={newAddress.postalCode}
                          onChange={handleAddressInputChange}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Country
                        </label>
                        <input
                          type="text"
                          name="country"
                          value={newAddress.country}
                          onChange={handleAddressInputChange}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        id="defaultAddress"
                        name="isDefault"
                        checked={newAddress.isDefault}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            isDefault: e.target.checked,
                          })
                        }
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="defaultAddress"
                        className="text-sm font-medium"
                      >
                        Set as default address
                      </label>
                    </div>
                    <div className="flex justify-end space-x-3 mt-6">
                      <button
                        onClick={() => setShowAddressForm(false)}
                        className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddAddress}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                      >
                        Save Address
                      </button>
                    </div>
                  </div>
                )}

                {addresses?.[0].street === "" ||
                !addresses?.[0].street ? (
                  <div className="p-6 rounded-lg border border-gray-200 bg-gray-50">
                    <p className="text-center text-sm">
                      No Address present, please add a new address
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className={`p-6 rounded-lg border ${
                          address.isDefault
                            ? "border-indigo-500"
                            : "border-gray-200"
                        } ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <span className="font-medium">{address.type}</span>
                            {address.isDefault && (
                              <span className="ml-2 px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-indigo-600 hover:text-indigo-800">
                              <FiEdit size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteAddress(address.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <FiTrash2 size={18} />
                            </button>
                          </div>
                        </div>
                        <p className="text-sm">{address.street}</p>
                        <p className="text-sm">
                          {address.city}, {address.state} {address.postalCode}
                        </p>
                        <p className="text-sm">{address.country}</p>
                        {!address.isDefault && (
                          <button
                            onClick={() => handleSetDefaultAddress(address.id)}
                            className="mt-4 text-sm text-indigo-600 hover:text-indigo-800"
                          >
                            Set as default
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div
                className={`p-6 rounded-lg shadow-md ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h2 className="text-2xl font-semibold mb-6">Order History</h2>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr
                        className={`border-b ${
                          darkMode ? "border-gray-700" : "border-gray-200"
                        }`}
                      >
                        <th className="text-left py-3 px-4">Order ID</th>
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-left py-3 px-4">Items</th>
                        <th className="text-left py-3 px-4">Total</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr
                          key={order.id}
                          className={`border-b ${
                            darkMode ? "border-gray-700" : "border-gray-200"
                          }`}
                        >
                          <td className="py-4 px-4">#{order.id}</td>
                          <td className="py-4 px-4">{order.date}</td>
                          <td className="py-4 px-4">{order.items}</td>
                          <td className="py-4 px-4">
                            ${order.total.toFixed(2)}
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                order.status === "Delivered"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "Shipped"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <button className="text-indigo-600 hover:text-indigo-800 text-sm">
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === "wishlist" && (
              <div
                className={`p-6 rounded-lg shadow-md ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h2 className="text-2xl font-semibold mb-6">My Wishlist</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlist.map((item) => (
                    <div
                      key={item.id}
                      className={`p-4 rounded-lg border ${
                        darkMode ? "border-gray-700" : "border-gray-200"
                      }`}
                    >
                      <div className="flex space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-lg font-semibold mt-1">
                            ${item.price.toFixed(2)}
                          </p>
                          <div className="flex space-x-3 mt-3">
                            <button className="text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition">
                              Add to Cart
                            </button>
                            <button
                              onClick={() => handleRemoveFromWishlist(item.id)}
                              className="text-sm text-red-600 hover:text-red-800"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Methods Tab */}
            {activeTab === "payments" && (
              <div
                className={`p-6 rounded-lg shadow-md ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Payment Methods</h2>
                  <button className="flex items-center space-x-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                    <FiPlus size={16} />
                    <span>Add New Method</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`p-4 rounded-lg border ${
                        method.isDefault
                          ? "border-indigo-500"
                          : "border-gray-200"
                      } ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-12 h-8 rounded flex items-center justify-center ${
                              method.type === "Visa"
                                ? "bg-blue-900"
                                : "bg-red-900"
                            }`}
                          >
                            <span className="text-white font-medium text-xs">
                              {method.type === "Visa" ? "VISA" : "MC"}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">
                              {method.type} ending in {method.last4}
                            </p>
                            <p className="text-sm text-gray-500">
                              Expires {method.expiry}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          {method.isDefault ? (
                            <span className="text-sm text-indigo-600">
                              Default
                            </span>
                          ) : (
                            <button
                              onClick={() => handleSetDefaultPayment(method.id)}
                              className="text-sm text-indigo-600 hover:text-indigo-800"
                            >
                              Set as default
                            </button>
                          )}
                          <button
                            onClick={() => handleDeletePaymentMethod(method.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Account Settings Tab */}
            {activeTab === "settings" && (
              <div
                className={`p-6 rounded-lg shadow-md ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h2 className="text-2xl font-semibold mb-6">
                  Account Settings
                </h2>

                <div className="space-y-6">
                  <div
                    className={`p-6 rounded-lg ${
                      darkMode ? "bg-gray-700" : "bg-gray-50"
                    }`}
                  >
                    <h3 className="text-lg font-medium mb-4">
                      Change Password
                    </h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                      >
                        Update Password
                      </button>
                    </form>
                  </div>

                  <div
                    className={`p-6 rounded-lg ${
                      darkMode ? "bg-gray-700" : "bg-gray-50"
                    }`}
                  >
                    <h3 className="text-lg font-medium mb-4">
                      Notification Preferences
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-gray-500">
                            Receive updates via email
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            defaultChecked
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">SMS Notifications</p>
                          <p className="text-sm text-gray-500">
                            Receive updates via text message
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Promotional Offers</p>
                          <p className="text-sm text-gray-500">
                            Receive special offers and discounts
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            defaultChecked
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-6 rounded-lg ${
                      darkMode ? "bg-gray-700" : "bg-gray-50"
                    }`}
                  >
                    <h3 className="text-lg font-medium mb-4">Delete Account</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Once you delete your account, there is no going back.
                      Please be certain.
                    </p>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                      Delete My Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
