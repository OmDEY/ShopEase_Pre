import React, { useEffect, useState } from "react";
import {
  FaStar,
  FaTruck,
  FaDollarSign,
  FaCalendarAlt,
  FaShieldAlt,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import ImageMagnifier from "../../Components/Main/ImageMagnifier"; // Assuming ImageMagnifier is in the same folder
import BigCard from "../../Components/Main/Common/BigCard";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { fetchProductById, submitProductReview } from "../../services/api";

// Dummy product data
const DummyProduct = {
  id: 1,
  name: "Awesome Product",
  description: "This is an amazing product with great features.",
  brand: "Brand A",
  price: 299,
  rating: 4.5,
  stock: true,
  images: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjnIwY2c_pLXybmoSDikwCF6hehjs0xb6UzQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjnIwY2c_pLXybmoSDikwCF6hehjs0xb6UzQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjnIwY2c_pLXybmoSDikwCF6hehjs0xb6UzQ&s",
  ],
  moreDetails: [
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjnIwY2c_pLXybmoSDikwCF6hehjs0xb6UzQ&s",
      description:
        "Detailed view of the product with extra features highlighted.",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjnIwY2c_pLXybmoSDikwCF6hehjs0xb6UzQ&s",
      description: "Additional details and specs about the product.",
    },
  ],
};

const comparisonData = [
  {
    name: "Awesome Product",
    brand: "Brand A",
    price: 299,
    rating: 4.5,
    features: "Feature A, Feature B, Feature C",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjnIwY2c_pLXybmoSDikwCF6hehjs0xb6UzQ&s",
  },
  {
    name: "Related Product 1",
    brand: "Brand Z",
    price: 220,
    rating: 4.3,
    features: "Feature X, Feature Y, Feature Z",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjnIwY2c_pLXybmoSDikwCF6hehjs0xb6UzQ&s",
  },
  {
    name: "Related Product 2",
    brand: "Brand W",
    price: 270,
    rating: 4.1,
    features: "Feature M, Feature N, Feature O",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjnIwY2c_pLXybmoSDikwCF6hehjs0xb6UzQ&s",
  },
];

// Dummy related products data
const relatedProducts = [
  {
    name: "Related Product 1",
    brand: "Brand Z",
    price: 220,
    rating: 4.3,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjnIwY2c_pLXybmoSDikwCF6hehjs0xb6UzQ&s",
  },
  {
    name: "Related Product 2",
    brand: "Brand W",
    price: 270,
    rating: 4.1,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjnIwY2c_pLXybmoSDikwCF6hehjs0xb6UzQ&s",
  },
];

const SingleProductDisplay = () => {
  const [product, setProduct] = useState(DummyProduct);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const [reviews, setReviews] = useState([
    { id: 1, name: "John Doe", rating: 4, comment: "Great product!" },
    {
      id: 2,
      name: "Jane Smith",
      rating: 5,
      comment: "Loved it, will buy again.",
    },
    {
      id: 3,
      name: "Alice Brown",
      rating: 3,
      comment: "Good, but could be better.",
    },
  ]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get("productId") || ""; // Get search term from query string

  useEffect(() => {
    console.log("productId", productId);
    console.log("searching.....", productId);
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    fetchProductById(productId)
      .then((response) => {
        console.log(response.data);
        setProduct(response.data.product); // Assuming response structure { product: ... }
        setMainImage(response?.data?.product?.images[0]);
        setReviews(response?.data?.product?.reviews);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [mainImage, setMainImage] = useState(
    product?.images ? product.images[0] : ""
  );

  const handleReviewSubmit = () => {
    if (review) {
      setReviews([
        ...reviews,
        {
          id: reviews.length + 1,
          name: "Anonymous",
          rating: 5,
          comment: review,
        },
      ]);
      setReview("");
      setRating(0);
      setHoverRating(0);
    }
    const userId = localStorage.getItem("userId");
    submitProductReview(userId, review, rating, product._id)
      .then((response) => {
        toast.success(response?.data?.message);
        fetchProduct();
        setRating(0);
        setReview("");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };

  return (
    <div className="p-8 bg-gray-100 w-full">
      {/* Product Details */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="flex flex-col lg:flex-row">
          {/* Image Section with Zoom Effect */}
          <div className="relative lg:w-1/2">
            <ImageMagnifier
              src={mainImage}
              width="100%"
              height="400px"
              magnifierHeight={150}
              magnifieWidth={150}
              zoomLevel={2}
            />
            {/* Thumbnails */}
            <div className="mt-4 flex space-x-4">
              {product?.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Product variant ${idx}`}
                  className={`w-20 h-20 cursor-pointer rounded-lg transition-transform transform hover:scale-110 ${
                    mainImage === img ? "border-4 border-blue-500" : ""
                  }`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:ml-8 lg:w-1/2">
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-gray-700 font-semibold mb-4">
              Brand: {product.brand}
            </p>
            <div className="flex items-center mb-4">
              <span className="text-yellow-500">
                {"★".repeat(Math.floor(product.rating))}
                {"☆".repeat(5 - Math.floor(product.rating))}
              </span>
              <span className="ml-2 text-gray-500">({product.rating})</span>
            </div>
            <p
              className={`text-xl font-bold mb-4 ${
                product.stock ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.stock ? "In Stock" : "Out of Stock"}
            </p>
            <p className="text-2xl font-bold mb-4">${product.price}</p>

            {/* Offers and Icons */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Offers</h3>
              <div className="relative bg-gray-50 p-4 rounded-lg mb-4">
                <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300">
                  <FaArrowLeft />
                </button>
                <div className="flex overflow-x-auto space-x-4">
                  <div className="min-w-[200px] bg-white p-4 rounded-lg shadow-md">
                    <p>No Cost EMI: Upto ₹2,025.86 EMI interest savings</p>
                  </div>
                  <div className="min-w-[200px] bg-white p-4 rounded-lg shadow-md">
                    <p>
                      Bank Offer: Upto ₹1,500.00 discount on select Credit Cards
                    </p>
                  </div>
                  <div className="min-w-[200px] bg-white p-4 rounded-lg shadow-md">
                    <p>Partner Offers: Save up to 28% on business purchases</p>
                  </div>
                  <div className="min-w-[200px] bg-white p-4 rounded-lg shadow-md">
                    <p>Cashback: Flat ₹25 cashback & rewards worth ₹225</p>
                  </div>
                </div>
                <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300">
                  <FaArrowRight />
                </button>
              </div>

              <h3 className="text-lg font-semibold mb-2">Icons</h3>
              <div className="bg-gray-50 p-4 rounded-lg flex flex-wrap gap-6">
                <div className="flex items-center space-x-2">
                  <FaTruck className="text-green-500 text-2xl" />
                  <span className="text-gray-700">Free Delivery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaDollarSign className="text-blue-500 text-2xl" />
                  <span className="text-gray-700">Pay on Delivery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaCalendarAlt className="text-red-500 text-2xl" />
                  <span className="text-gray-700">7 Days Return</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaShieldAlt className="text-yellow-500 text-2xl" />
                  <span className="text-gray-700">Secure Transaction</span>
                </div>
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Select Size</h3>
              <div className="flex space-x-4">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  S
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  M
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  L
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  XL
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Add to Cart
            </button>
          </div>
        </div>

        {product?.additionalInfo?.length > 0 ? <hr className="my-12" /> : ""}

        {/* Additional Details */}
        <div className="mt-12">
          {product?.additionalInfo?.length > 0 ? (
            <h2 className="text-2xl font-bold mb-6">More Details</h2>
          ) : (
            ""
          )}
          {product?.additionalInfo?.map((detail, idx) => (
            <div key={idx} className="mb-6">
              <p className="text-gray-700">{detail.description}</p>
              {detail.images &&
                detail.images.map((image, idx) => (
                  <img
                    src={image}
                    alt={`Detail ${idx}`}
                    className="w-full h-auto mb-4 rounded-lg"
                  />
                ))}
            </div>
          ))}
        </div>

        <hr className="my-12" />

        {/* Product Comparison With Similar Products */}
        <div className="mt-12 bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h2 className="text-2xl font-bold mb-6">Product Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2"></th>
                  {comparisonData.map((item, index) => (
                    <th
                      key={index}
                      className="border border-gray-300 px-4 py-2 text-center"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover mx-auto rounded-lg shadow-md"
                      />
                      <p className="mt-2 font-semibold">{item.name}</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">
                    Brand
                  </td>
                  {comparisonData.map((item, index) => (
                    <td
                      key={index}
                      className="border border-gray-300 px-4 py-2 text-center"
                    >
                      {item.brand}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">
                    Price
                  </td>
                  {comparisonData.map((item, index) => (
                    <td
                      key={index}
                      className="border border-gray-300 px-4 py-2 text-center"
                    >
                      ${item.price}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">
                    Rating
                  </td>
                  {comparisonData.map((item, index) => (
                    <td
                      key={index}
                      className="border border-gray-300 px-4 py-2 text-center"
                    >
                      {item.rating} <span className="text-yellow-500">★</span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">
                    Features
                  </td>
                  {comparisonData.map((item, index) => (
                    <td
                      key={index}
                      className="border border-gray-300 px-4 py-2 text-center"
                    >
                      {item.features}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <hr className="my-12" />

        {/* Reviews Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="mb-6 border-b pb-4">
                <h3 className="text-lg font-semibold mb-2">
                  {review?.userId?.fullName ? (
                    review?.userId?.fullName
                  ) : (
                    <>
                      {review?.userId?.firstName} {review?.userId?.lastName}
                    </>
                  )}
                </h3>
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500">
                    {"★".repeat(Math.floor(review.rating))}
                    {"☆".repeat(5 - Math.floor(review.rating))}
                  </span>
                  <span className="ml-2 text-gray-500">({review?.rating})</span>
                </div>
                <p className="text-gray-700">{review?.review}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Add a Review</h3>

            {/* Star Rating Section */}
            <div className="flex items-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <div key={star} className="relative">
                  {/* Full Star */}
                  <svg
                    onClick={() => setRating(star)} // Full star on click
                    onMouseEnter={() => setHoverRating(star)} // Highlight on hover
                    onMouseLeave={() => setHoverRating(0)} // Reset highlight on leave
                    className={`w-6 h-6 cursor-pointer ${
                      hoverRating >= star || rating >= star
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.568 8.332 1.2-6 5.845 1.416 8.245L12 18.896l-7.416 3.895L6 13.2l-6-5.845 8.332-1.2z" />
                  </svg>

                  {/* Half Star */}
                  <svg
                    onClick={() => setRating(star - 0.5)} // Half star on click
                    onMouseEnter={() => setHoverRating(star - 0.5)} // Highlight half star on hover
                    onMouseLeave={() => setHoverRating(0)} // Reset highlight on leave
                    className={`absolute left-0 top-0 w-6 h-6 cursor-pointer ${
                      hoverRating >= star - 0.5 || rating >= star - 0.5
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.568 8.332 1.2-6 5.845 1.416 8.245L12 18.896l-7.416 3.895L6 13.2l-6-5.845 8.332-1.2z" />
                  </svg>
                </div>
              ))}
            </div>

            {/* Review Textarea */}
            <textarea
              rows="4"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              placeholder="Write your review here..."
            />

            <button
              onClick={handleReviewSubmit}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Submit Review
            </button>
          </div>
        </div>

        <hr className="my-12" />

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="flex space-x-4 overflow-x-auto">
            {relatedProducts.map((product, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-4 rounded-lg shadow-lg flex-shrink-0 w-64"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">{product.brand}</p>
                <p className="text-xl font-bold mb-2">${product.price}</p>
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500">
                    {"★".repeat(Math.floor(product.rating))}
                    {"☆".repeat(5 - Math.floor(product.rating))}
                  </span>
                  <span className="ml-2 text-gray-500">({product.rating})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BigCard />
    </div>
  );
};

export default SingleProductDisplay;
