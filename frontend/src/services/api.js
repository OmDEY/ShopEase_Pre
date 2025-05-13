import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || 'https://shopease-pre.onrender.com/api/';
// const API_URL = "http://localhost:4000/api/";

const uploadHomePageBannerCarouselImages = async (formData) => {
  const response = await axios.post(
    `${API_URL}homePageCategoryDataUploads/upload/HomePageBannerImages`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;
};

const fetchProductsOnFilter = async (params) => {
  const response = await axios.get(`${API_URL}products/fetchProductsOnFilter`, {
    params,
  });
  return response;
};

const fetchOptions = async () => {
  const response = await axios.get(`${API_URL}products/fetchOptions`);
  return response;
};

const adminUpdateProduct = async (formData, productId) => {
  const response = await axios.put(
    `${API_URL}products/updateProduct/${productId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;
};

const adminAddProduct = async (formData) => {
  const response = await axios.post(`${API_URL}products/addProduct`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

const adminDeleteProduct = async (productId) => {
  const response = await axios.delete(
    `${API_URL}products/deleteProduct/${productId}`
  );

  return response;
};

const fetchAllUsers = async () => {
  const response = await axios.get(`${API_URL}users/fetchAllUsers`);

  return response;
};

const fetchHomePageBannerCarouselImages = async () => {
  const response = await axios.get(
    `${API_URL}homePageCategoryDataUploads/fetch/HomePageBannerImages`
  );

  return response;
};

const fetchUserById = async (userId) => {
  const response = await axios.get(`${API_URL}users/getUserById/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response;
};

const removeItemFromCart = async (id) => {
  const response = await axios.delete(`${API_URL}cart/deleteCartItem/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response;
};

const updateCartItem = async (id, newQuantity) => {
  const response = await axios.put(
    `${API_URL}cart/updateCartItem`,
    { productId: id, quantity: newQuantity },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return response;
};

const fetchCart = async () => {
  const response = await axios.get(`${API_URL}cart/getCart`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response;
};

const addToCart = async (productId, quantity, selectedSize) => {
  const response = await axios.post(
    `${API_URL}cart/addToCart`,
    { productId, quantity: quantity, selectedSize },
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );

  return response;
};

const fetchProductsFiltered = async (searchTerm, page, limit) => {
  const response = await axios.get(
    `${API_URL}products/fetchProductsFiltered?searchTerm=${searchTerm}&page=${page}&limit=${limit}`
  );

  return response;
};

const fetchAllProducts = async (page, limit) => {
  const response = await axios.get(
    `${API_URL}products/getProducts?page=${page}&limit=${limit}`
  );

  return response;
};

const fetchProductById = async (productId) => {
  const response = await axios.get(
    `${API_URL}products/getProductById/${productId}`
  ); // Use URL param
  return response;
};

const submitProductReview = async (userId, review, rating, productId) => {
  const response = await axios.post(`${API_URL}products/submitProductReview`, {
    userId: userId,
    review: review,
    productId: productId,
    rating: rating,
  });
  return response;
};

const captureUserData = async (userData) => {
  const response = await axios.post(
    `${API_URL}users/auth/captureUserData`,
    userData
  );
  return response;
};

const adminLogin = async (email, password) => {
  const response = await axios.post(`${API_URL}admin/auth/login`, {
    email,
    password,
  });
  return response;
};

const adminRegister = async (userData) => {
  const response = await axios.post(`${API_URL}admin/auth/register`, userData);
  return response;
};

const userRegister = async (userData) => {
  const response = await axios.post(`${API_URL}users/auth/register`, userData);
  return response;
};

const userLogin = async (email, password) => {
  const response = await axios.post(`${API_URL}users/auth/login`, {
    email,
    password,
  });
  return response;
};

const adminVerifyToken = async (token) => {
  const response = await axios.post(
    `${API_URL}admin/auth/verify-token`,
    {}, // Empty body since it's a POST request with only headers
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response;
};

const userVerifyToken = async (token) => {
  const response = await axios.get(
    `${API_URL}users/auth/verify-token`,
    { headers: { Authorization: `Bearer ${token}` } } // Headers should be passed as the second argument
  );
  return response;
};

const adminLogout = async () => {
  const response = await axios.get(`${API_URL}admin/auth/logout`);
  return response;
};

const addToWishlist = async (userId, productId) => {
  const response = await axios.post(`${API_URL}wishlist/add`, {
    userId,
    productId,
  });
  return response;
};

const getWishlist = async (userId) => {
  const response = await axios.get(`${API_URL}wishlist/${userId}`);
  return response;
};

const removeFromWishlist = async (userId, productId) => {
  const response = await axios.post(`${API_URL}wishlist/remove`, {
    userId,
    productId,
  });
  return response;
};

const toggleWishlistItem = async (userId, productId) => {
  const response = await axios.post(`${API_URL}wishlist/toggle`, {
    userId,
    productId,
  });
  return response;
};

const checkWishlist = async (userId, productId) => {
  const res = await axios.get(
    `${API_URL}wishlist/check/${userId}/${productId}`
  );
  return res.data.isInWishlist; // true or false
};

const createOrder = async (amount) => {
  const response = await axios.post(`${API_URL}payment/create-order`, {
    amount,
  });
  return response;
};

const verifyPayment = async (data, userId, items, address, totalAmount) => {
  const response = await axios.post(`${API_URL}payment/verify-payment`, {
    data,
    userId,
    items,
    address,
    totalAmount,
  });
  return response;
};

const fetchNewArrivalProducts = async (page, limit) => {
  const response = await axios.get(
    `${API_URL}new-arrivals/fetch-new-arrivals?page=${page}&limit=${limit}`
  );
  return response.data;
};

const fetchBestSellers = async (activeTab) => {
  const response = await axios.get(
    `${API_URL}best-sellers/fetch-best-sellers?category=${activeTab}`
  );
  return response.data;
};

const fetchDiscountDeals = async () => {
  const response = await axios.get(
    `${API_URL}discount-deals/fetch-discount-deals`
  );
  return response.data;
};

const fetchDealsOfTheDay = async () => {
  const response = await axios.get(
    `${API_URL}deals-of-the-day/deals-of-the-day`
  );
  return response.data;
};

const fetchFeaturedProducts = async () => {
  const response = await axios.get(
    `${API_URL}featured-products/fetch-featured-products`
  );
  return response.data;
};

const fetchWeekendSpecialProducts = async () => {
  const response = await axios.get(
    `${API_URL}weekend-specials/weekend-specials`
  );
  return response.data;
};

const fetchClearanceProducts = async () => {
  const response = await axios.get(
    `${API_URL}clearance-sale/fetch-clearance-products`
  );
  return response.data;
};

const fetchBundleOffers = async () => {
  const response = await axios.get(
    `${API_URL}bundle-offers/fetch-bundle-offers`
  );
  return response.data;
};

const fetchOrders = async () => {
  const response = await axios.get(`${API_URL}orders/fetch-orders`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

const fetchAllOrders = async () => {
  const response = await axios.get(`${API_URL}orders/fetch-all-orders`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

const changeOrderStatus = async (orderId, status) => {
  const response = await axios.post(
    `${API_URL}orders/update-order-status/${orderId}`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

const addShippingAddress = async (address) => {
  const response = await axios.post(
    `${API_URL}users/addShippingAddress`,
    address,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

const applyClearanceSaleDiscount = async (id, clearanceLevel, stock) => {
  const response = await axios.put(
    `${API_URL}clearance-sale/apply-clearance-discount/${id}`,
    { clearanceLevel, stock }
  );
  return response.data;
};

const updateBundleOffer = async (productId, bundleData) => {
  const response = await axios.put(
    `${API_URL}bundle-offers/update-bundle-offer/${productId}`,
    bundleData
  );
  return response.data;
};

const adminAddFeaturedProduct = async (id, payload) => {
  const response = await axios.post(
    `${API_URL}featured-products/add-featured-product/${id}`,
    payload
  );

  return response;
};

const adminAddPopularProduct = async (id, payload) => {
  const response = await axios.post(
    `${API_URL}popular-product/admin-add-popular-products/${id}`,
    payload
  );
  return response;
};

const adminAddDailyBestSalesProduct = async (id, payload) => {
  const response = await axios.put(
    `${API_URL}daily-best-sales/products/${id}/daily-sales`,
    payload
  );
  return response;
};

const fetchDailyBestSalesProducts = async () => {
  const response = await axios.get(
    `${API_URL}daily-best-sales/products/daily-best-sales`
  );
  return response.data;
};

const fetchPopularProducts = async () => {
  const response = await axios.get(
    `${API_URL}popular-product/fetch-popular-products`
  );
  return response.data;
};

const fetchFeaturedCategoriesProducts = async (categoryId) => {
  const response = await axios.get(
    `${API_URL}featured-categories/fetch-featured-categories-products?categoryId=${categoryId}`
  );
  return response.data;
};

const fetchCategories = async () => {
  const response = await axios.get(`${API_URL}featured-categories/fetch-categories`);
  return response.data;
};

const sendOrderStatusEmail = async (orderId) => {
  const response = await axios.post(
    `${API_URL}orders/send-order-status-email/${orderId}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response;
};

const userReturnProduct = async (orderId, itemId, formData) => {
  const response = await axios.post(
    `${API_URL}products/userReturnProduct/${orderId}/${itemId}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response;
};

const getAllReturnRequests = async () => {
  const response = await axios.get(
    `${API_URL}orders/get-all-return-requests`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

const updateReturnRequestStatus = async (orderId, productId, status) => {
  const response = await axios.post(
    `${API_URL}orders/update-return-request-status/${orderId}/${productId}`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

const cancelOrder = async (orderId) => {
  const response = await axios.post(
    `${API_URL}orders/cancel-order/${orderId}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

const fetchCancelledOrders = async () => {
  const response = await axios.get(
    `${API_URL}orders/fetch-cancelled-orders`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

const processRefund = async (orderId) => {
  const response = await axios.put(
    `${API_URL}orders/process-refund/${orderId}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response;
};

const restockCancelledProducts = async (orderId) => {
  const response = await axios.put(
    `${API_URL}orders/restock-items/${orderId}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response;
};

const deleteCancelledOrder = async (orderId) => {
  const response = await axios.delete(
    `${API_URL}orders/delete-cancelled-order/${orderId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response;
};

const fetchTopDealsOfTheDay = async () => {
  const response = await axios.get(
    `${API_URL}deals-of-the-day/top-deals-of-the-day`
  );
  return response.data;
};

const createCODOrder = async (payload) => {
  const response = await axios.post(
    `${API_URL}payment/create-cod-order`,
    payload
  );
  return response;
};

const fetchTwoProductsPerCategory = async () => {
  const response = await axios.get(
    `${API_URL}products/fetchTwoProductsPerCategory`
  );
  return response.data;
};

const addToNewsletterEmail = async (payload) => {
  const response = await axios.post(
    `${API_URL}users/addToNewsletterEmail`,
    payload
  );
  return response;
};

const contactSupport = async (payload) => {
  const response = await axios.post(`${API_URL}users/contact`, payload);
  return response;
};

export {
  fetchUserById,
  fetchHomePageBannerCarouselImages,
  adminUpdateProduct,
  adminAddProduct,
  adminDeleteProduct,
  fetchAllUsers,
  uploadHomePageBannerCarouselImages,
  removeItemFromCart,
  updateCartItem,
  fetchCart,
  addToCart,
  fetchProductsFiltered,
  fetchAllProducts,
  fetchProductById,
  submitProductReview,
  captureUserData,
  adminLogin,
  adminRegister,
  adminVerifyToken,
  userVerifyToken,
  adminLogout,
  userLogin,
  userRegister,
  fetchOptions,
  fetchProductsOnFilter,
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  toggleWishlistItem,
  checkWishlist,
  createOrder,
  verifyPayment,
  fetchNewArrivalProducts,
  fetchBestSellers,
  fetchDiscountDeals,
  fetchDealsOfTheDay,
  fetchFeaturedProducts,
  fetchWeekendSpecialProducts,
  fetchClearanceProducts,
  fetchBundleOffers,
  fetchOrders,
  fetchAllOrders,
  changeOrderStatus,
  addShippingAddress,
  applyClearanceSaleDiscount,
  updateBundleOffer,
  adminAddFeaturedProduct,
  adminAddPopularProduct,
  adminAddDailyBestSalesProduct,
  fetchDailyBestSalesProducts,
  fetchPopularProducts,
  fetchFeaturedCategoriesProducts,
  fetchCategories,
  sendOrderStatusEmail,
  userReturnProduct,
  getAllReturnRequests,
  updateReturnRequestStatus,
  cancelOrder,
  fetchCancelledOrders,
  processRefund,
  restockCancelledProducts,
  deleteCancelledOrder,
  fetchTopDealsOfTheDay,
  createCODOrder,
  fetchTwoProductsPerCategory,
  addToNewsletterEmail,
  contactSupport
};
