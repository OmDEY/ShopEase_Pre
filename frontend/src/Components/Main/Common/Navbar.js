import React, { useState, useContext, useEffect } from "react";
import {
  FaHeadphones,
  FaUser,
  FaHeart,
  FaSyncAlt,
  FaShoppingCart,
  FaSearch,
  FaBars,
  FaChevronDown,
  FaChevronRight,
  FaLaptop,
  FaTshirt,
  FaHome,
  FaRegGem,
  FaFutbol,
  FaGamepad,
  FaBook,
  FaCar,
  FaBaby,
  FaTools,
} from "react-icons/fa";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../../../Context/ContextProvider";
import { fetchUserById } from "../../../services/api";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [productSearchTerm, setProductSearchTerm] = useState("");
  const [userName, setUserName] = useState("");
  const [isAccountDropdown, setIsAccountDropdown] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const navigate = useNavigate();

  const { setSearchTerm } = useContext(SearchContext);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetchUserById(userId)
        .then((response) => {
          if (response.data && response.data.firstName) {
            setUserName(`${response.data.firstName} ${response.data.lastName}`);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const logout = async () => {
    try {
      localStorage.clear();
      navigate("/auth");
      setIsAccountDropdown(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleAccountDropdown = () => {
    setIsAccountDropdown(!isAccountDropdown);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleProductSearch = () => {
    if (productSearchTerm) {
      setSearchTerm(productSearchTerm);
      navigate(`/products`);
    }
  };

  const toggleNavDropdown = (item) => {
    setActiveDropdown(activeDropdown === item ? null : item);
  };

  // Categories data
  const categories = [
    {
      name: "Electronics",
      icon: <FaLaptop className="mr-2" />,
      subcategories: [
        "Smartphones",
        "Laptops",
        "Headphones",
        "Cameras",
        "Smart Watches",
      ],
    },
    {
      name: "Fashion",
      icon: <FaTshirt className="mr-2" />,
      subcategories: [
        "Men's Clothing",
        "Women's Clothing",
        "Kids' Fashion",
        "Footwear",
        "Accessories",
      ],
    },
    {
      name: "Home & Kitchen",
      icon: <FaHome className="mr-2" />,
      subcategories: [
        "Furniture",
        "Kitchen Appliances",
        "Home Decor",
        "Lighting",
        "Bedding",
      ],
    },
    {
      name: "Beauty & Health",
      icon: <FaRegGem className="mr-2" />,
      subcategories: [
        "Skincare",
        "Makeup",
        "Hair Care",
        "Fragrances",
        "Vitamins",
      ],
    },
    {
      name: "Sports & Outdoors",
      icon: <FaFutbol className="mr-2" />,
      subcategories: [
        "Fitness Equipment",
        "Outdoor Recreation",
        "Team Sports",
        "Cycling",
        "Yoga",
      ],
    },
    {
      name: "Toys & Games",
      icon: <FaGamepad className="mr-2" />,
      subcategories: [
        "Action Figures",
        "Board Games",
        "Dolls",
        "Educational Toys",
        "Puzzles",
      ],
    },
    {
      name: "Books & Media",
      icon: <FaBook className="mr-2" />,
      subcategories: [
        "Fiction",
        "Non-Fiction",
        "Children's Books",
        "Audiobooks",
        "Magazines",
      ],
    },
    {
      name: "Automotive",
      icon: <FaCar className="mr-2" />,
      subcategories: [
        "Car Accessories",
        "Motorcycle Parts",
        "Tools & Equipment",
        "Car Care",
        "Interior Accessories",
      ],
    },
    {
      name: "Baby Products",
      icon: <FaBaby className="mr-2" />,
      subcategories: [
        "Diapering",
        "Feeding",
        "Baby Gear",
        "Nursery",
        "Toys",
      ],
    },
    {
      name: "DIY & Tools",
      icon: <FaTools className="mr-2" />,
      subcategories: [
        "Power Tools",
        "Hand Tools",
        "Painting Supplies",
        "Hardware",
        "Gardening",
      ],
    },
  ];

  // Navigation items with dropdown content
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Shop",
      link: "/products",
      dropdown: [
        { label: "New Arrivals", link: "/new-arrivals" },
        { label: "Best Sellers", link: "/best-sellers" },
        { label: "Discount Deals", link: "/discount-deals" },
        { label: "Featured Products", link: "/featured-products" },
      ],
    },
    {
      name: "Deals",
      link: "/deals",
      dropdown: [
        { label: "Today's Deals", link: "/deals-of-the-day" },
        { label: "Weekend Specials", link: "/weekend-specials" },
        { label: "Clearance Sale", link: "/clearance-sale" },
        { label: "Bundle Offers", link: "/bundle-offers" },
      ],
    },
    {
      name: "Pages",
      dropdown: [
        { label: "About Us", link: "/about" },
        { label: "Contact Us", link: "/contact" },
        { label: "Privacy Policy", link: "/privacy-policy" },
        { label: "Terms & Conditions", link: "/terms-conditions" },
      ],
    },
  ];

  return (
    <div>
      {/* First section - Top bar */}
      <div className="navbar relative text-white p-2 h-7 overflow-hidden">
        <div className="container mx-auto flex justify-between items-center relative z-10">
          <div className="flex space-x-4 text-xs md:text-sm">
            <Link to="/about" className="cursor-pointer hover:underline">
              About Us
            </Link>
            <span>|</span>
            <Link
              to="/profile"
              className="cursor-pointer hover:underline"
            >
              My Account
            </Link>
            <span>|</span>
            <Link
              to="/wishlist"
              className="cursor-pointer hover:underline"
            >
              Wishlist
            </Link>
            <span>|</span>
            <Link
              to="/orders"
              className="cursor-pointer hover:underline"
            >
              Order Tracking
            </Link>
          </div>
          <span className="text-xs md:text-sm hidden md:block">
            100% Genuine Products & Secure Delivery
          </span>
          <div className="flex space-x-4">
            <span className="text-xs md:text-sm cursor-pointer hover:underline">
              <FaHeadphones className="inline mr-1" />
              Need Help? Call Us at (+91) 9798561152 
            </span>
          </div>
        </div>
      </div>

      {/* Second section - Main navigation */}
      <div className="bg-white shadow p-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo */}
          <Link to="/" className="text-2xl md:text-3xl font-bold text-gray-800 hover:text-pink-600 transition-colors">
            ShopEase
          </Link>

          {/* Search bar */}
          <div className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out w-full md:w-1/2 lg:w-1/3">
            <input
              type="text"
              value={productSearchTerm}
              onChange={(e) => {setSearchTerm(e.target.value); setProductSearchTerm(e.target.value)}}
              onKeyPress={(e) => e.key === 'Enter' && handleProductSearch()}
              className="px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-600 rounded-l-full text-sm md:text-base"
              placeholder="Search for products..."
            />
            <button
              onClick={handleProductSearch}
              className="flex items-center justify-center bg-pink-500 text-white p-2 md:p-3 transition-all duration-300 hover:bg-pink-600 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-pink-600"
            >
              <FaSearch className="text-lg md:text-xl" />
            </button>
          </div>

          {/* Icons */}
          <div className="flex space-x-4 md:space-x-6 text-gray-600 items-center">
            <div className="hidden md:flex items-center">
              <FaSyncAlt className="cursor-pointer text-lg md:text-xl hover:text-pink-600 transition-colors" />
              <Link to="/comparison" className="text-xs md:text-sm cursor-pointer hover:underline ml-1">
                Compare
              </Link>
            </div>
            
            <div className="hidden md:flex items-center">
              <FaHeart className="cursor-pointer text-lg md:text-xl hover:text-pink-600 transition-colors" />
              <Link to="/wishlist" className="text-xs md:text-sm cursor-pointer hover:underline ml-1">
                Wishlist
              </Link>
            </div>
            
            <div className="relative group">
              <button onClick={toggleAccountDropdown} className="flex items-center">
                <FaUser className="cursor-pointer text-lg md:text-xl hover:text-pink-600 transition-colors" />
                <span className="text-xs md:text-sm cursor-pointer hover:underline ml-1 hidden md:inline">
                  {userName ? userName : "Account"}
                </span>
              </button>
              {/* Account Dropdown */}
              {isAccountDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50 border border-gray-200">
                  <ul className="text-black">
                    {userName ? (
                      <>
                        <li>
                          <Link
                            to="/profile"
                            className="block p-2 cursor-pointer hover:bg-gray-100 rounded-t-md"
                            onClick={() => setIsAccountDropdown(false)}
                          >
                            My Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/orders"
                            className="block p-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => setIsAccountDropdown(false)}
                          >
                            My Orders
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/wishlist"
                            className="block p-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => setIsAccountDropdown(false)}
                          >
                            My Wishlist
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={logout}
                            className="block w-full text-left p-2 cursor-pointer hover:bg-gray-100 rounded-b-md text-red-600"
                          >
                            Logout
                          </button>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link
                            to="/auth?type=login"
                            className="block p-2 cursor-pointer hover:bg-gray-100 rounded-t-md"
                            onClick={() => setIsAccountDropdown(false)}
                          >
                            Login
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/auth?type=register"
                            className="block p-2 cursor-pointer hover:bg-gray-100 rounded-b-md"
                            onClick={() => setIsAccountDropdown(false)}
                          >
                            Register
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="relative group">
              <Link to="/cart" className="flex items-center">
                <FaShoppingCart className="cursor-pointer text-lg md:text-xl hover:text-pink-600 transition-colors" />
                <span className="text-xs md:text-sm cursor-pointer hover:underline ml-1 hidden md:inline">
                  Cart
                </span>
                {/* <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span> */}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Third section - Category navigation */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 md:p-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center relative">
          {/* Dropdowns */}
          <div className="flex flex-col md:flex-row items-start md:items-center w-full md:w-auto">
            {/* All Categories Dropdown */}
            <div className="relative w-full md:w-auto mb-2 md:mb-0">
              <button
                onClick={toggleDropdown}
                className="cursor-pointer flex items-center space-x-1 text-white hover:bg-blue-700 px-3 py-1 md:px-4 md:py-2 rounded-md transition-colors duration-300 w-full md:w-auto justify-between md:justify-center"
              >
                <div className="flex items-center">
                  <FaBars className="text-white mr-2" /> 
                  <span className="text-sm md:text-base">All Categories</span>
                </div>
                <FaChevronDown className={`ml-2 transition-transform duration-300 ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
              </button>
              
              {/* Mega Dropdown Content */}
              {isDropdownOpen && (
                <div className="absolute left-0 top-full mt-1 bg-white text-black shadow-2xl rounded-b-lg transition-all duration-300 w-full md:w-[800px] z-50 border border-gray-200">
                  <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map((category, index) => (
                      <div 
                        key={index} 
                        className="relative group"
                        onMouseEnter={() => setHoveredCategory(index)}
                        onMouseLeave={() => setHoveredCategory(null)}
                      >
                        <div className="flex items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                          <span className="text-blue-600">{category.icon}</span>
                          <span className="font-medium">{category.name}</span>
                          <FaChevronRight className="ml-auto text-gray-400 group-hover:text-gray-600" />
                        </div>
                        {hoveredCategory === index && (
                          <div className="absolute left-full top-0 ml-1 w-48 bg-white shadow-lg rounded-md p-2 z-10 border border-gray-200">
                            {category.subcategories.map((sub, subIndex) => (
                              <div 
                                key={subIndex} 
                                className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                                onClick={() => {
                                  setSearchTerm(`${sub}`);
                                  navigate(`/products?category=${category.name}&subcategory=${sub}`);
                                  setIsDropdownOpen(false);
                                }}
                              >
                                {sub}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-50 p-4 border-t border-gray-200">
                    <h4 className="font-semibold mb-2">Special Offers</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-pink-50 p-2 rounded border border-pink-100">
                        <div className="text-pink-600 font-medium">Sale Up To 70%</div>
                        <div className="text-xs text-gray-600">Limited time offer</div>
                      </div>
                      <div className="bg-blue-50 p-2 rounded border border-blue-100">
                        <div className="text-blue-600 font-medium">New Arrivals</div>
                        <div className="text-xs text-gray-600">Shop the latest</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Navigation Items */}
            <div className="flex flex-wrap items-center space-x-0 md:space-x-4 lg:space-x-6 space-y-2 md:space-y-0 w-full md:w-auto">
              {navItems.map((item, index) => (
                <div key={index} className="relative group">
                  {item.link ? (
                    <Link
                      to={item.link}
                      className="flex items-center px-2 py-1 hover:bg-blue-700 rounded transition-colors duration-300 text-sm md:text-base"
                      onMouseEnter={() => item.dropdown && toggleNavDropdown(item.name)}
                    >
                      <span>{item.name}</span>
                      {item.dropdown && (
                        <FaChevronDown className="ml-1 text-xs transition-transform duration-300 group-hover:transform group-hover:rotate-180" />
                      )}
                    </Link>
                  ) : (
                    <button
                      className="flex items-center px-2 py-1 hover:bg-blue-700 rounded transition-colors duration-300 text-sm md:text-base"
                      onMouseEnter={() => item.dropdown && toggleNavDropdown(item.name)}
                    >
                      <span>{item.name}</span>
                      {item.dropdown && (
                        <FaChevronDown className="ml-1 text-xs transition-transform duration-300 group-hover:transform group-hover:rotate-180" />
                      )}
                    </button>
                  )}
                  
                  {item.dropdown && activeDropdown === item.name && (
                    <div 
                      className="absolute left-0 top-full mt-1 bg-white text-black shadow-lg rounded-md w-48 z-50 border border-gray-200"
                      onMouseLeave={() => toggleNavDropdown(item.name)}
                    >
                      {item.dropdown.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.link}
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Support Center - Hidden on small screens */}
          <div className="hidden md:flex items-center space-x-2 bg-blue-700 px-4 py-2 rounded-md hover:bg-blue-800 transition-colors duration-300 cursor-pointer">
            <FaHeadphones className="text-xl text-white" />
            <div className="flex flex-col">
              <span className="font-semibold text-white text-sm">
                24/7 Support
              </span>
              <span className="text-white font-bold text-sm">(+91) 9798561152</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;