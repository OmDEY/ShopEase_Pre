import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://shopease-pre.onrender.com/api/';
// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api/';

const uploadHomePageBannerCarouselImages = async (formData) => {
    const response = await axios.post(`${API_URL}homePageCategoryDataUploads/upload/HomePageBannerImages`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response;
}

const fetchProductsOnFilter = async (params) => {
    const response = await axios.get(`${API_URL}products/fetchProductsOnFilter`, { params });
    return response;
}

const fetchOptions = async () => {
    const response = await axios.get(`${API_URL}products/fetchOptions`);
    return response;
}

const adminUpdateProduct = async (formData, productId) => {
    const response = await axios.put(`${API_URL}products/updateProduct/${productId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response;
}

const adminAddProduct = async (formData) => {
    const response = await axios.post(`${API_URL}products/addProduct`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    return response;
}

const adminDeleteProduct = async (productId) => {
    const response = await axios.delete(`${API_URL}products/deleteProduct/${productId}`);

    return response;
}

const fetchAllUsers = async () => {
    const response = await axios.get(`${API_URL}users/fetchAllUsers`)

    return response;
}

const fetchHomePageBannerCarouselImages = async () => {
    const response = await axios.get(`${API_URL}homePageCategoryDataUploads/fetch/HomePageBannerImages`);

    return response;
}

const fetchUserById = async (userId) => {
    const response = await axios.get(`${API_URL}users/getUserById/${userId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })

    return response;
}

const removeItemFromCart = async (id) => {
    const response = await axios.delete(`${API_URL}cart/deleteCartItem/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })

    return response;
}

const updateCartItem = async (id, newQuantity) => {
    const response = await axios.put(`${API_URL}cart/updateCartItem`, { productId: id, quantity: newQuantity }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })

    return response;
}

const fetchCart = async () => {
    const response = await axios.get(`${API_URL}cart/getCart`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })

    return response;
}

const addToCart = async (productId, quantity) => {
    const response = await axios.post(`${API_URL}cart/addToCart`,
        { productId, quantity: quantity },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    )

    return response;
}

const fetchProductsFiltered = async (searchTerm, page, limit) => {
    const response = await axios.get(`${API_URL}products/fetchProductsFiltered?searchTerm=${searchTerm}&page=${page}&limit=${limit}`)

    return response;
}

const fetchAllProducts = async (page, limit) => {
    const response = await axios.get(`${API_URL}products/getProducts?page=${page}&limit=${limit}`)

    return response;
}

const fetchProductById = async (productId) => {
    const response = await axios.get(`${API_URL}products/getProductById/${productId}`)  // Use URL param
    return response;
}

const submitProductReview = async (userId, review, rating, productId) => {
    const response = await axios.post(`${API_URL}products/submitProductReview`, { userId: userId, review: review, productId: productId, rating: rating })
    return response;
}

const captureUserData = async (userData) => {
    const response = await axios.post(`${API_URL}users/auth/captureUserData`, userData)
    return response;
}

const adminLogin = async (email, password) => {
    const response = await axios.post(`${API_URL}admin/auth/login`, { email, password })
    return response;
}

const adminRegister = async (userData) => {
    const response = await axios.post(`${API_URL}admin/auth/register`, userData)
    return response;
}

const userRegister = async (userData) => {
    const response = await axios.post(`${API_URL}users/auth/register`, userData)
    return response;
}

const userLogin = async (email, password) => {
    const response = await axios.post(`${API_URL}users/auth/login`, { email, password })
    return response;
}

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
    const response = await axios.get(`${API_URL}admin/auth/logout`)
    return response;
}

const addToWishlist = async (userId, productId) => {
    const response = await axios.post(`${API_URL}wishlist/add`, { userId, productId });
    return response;
  };
  
  const getWishlist = async (userId) => {
    const response = await axios.get(`${API_URL}wishlist/${userId}`);
    return response;
  };
  
  const removeFromWishlist = async (userId, productId) => {
    const response = await axios.post(`${API_URL}wishlist/remove`, { userId, productId });
    return response;
  };
  
  const toggleWishlistItem = async (userId, productId) => {
    const response = await axios.post(`${API_URL}wishlist/toggle`, { userId, productId });
    return response;
  };

  const checkWishlist = async (userId, productId) => {
    const res = await axios.get(`${API_URL}wishlist/check/${userId}/${productId}`);
    return res.data.isInWishlist; // true or false
  };

  const createOrder = async (amount) => {
    const response = await axios.post(`${API_URL}payment/create-order`, { amount });
    return response;
  };

  const verifyPayment = async (data) => {
    const response = await axios.post(`${API_URL}payment/verify-payment`, data);
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
};
