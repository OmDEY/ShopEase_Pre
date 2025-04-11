import { useEffect, useState } from "react";
import {
  FiHeart,
  FiShoppingCart,
  FiTrash2,
  FiChevronRight,
  FiShare2,
  FiX,
  FiStar,
} from "react-icons/fi";
import { toast } from "react-toastify";
import {
  addToCart,
  removeFromWishlist,
  toggleWishlistItem,
  getWishlist,
} from "../../services/api";

const WishlistPage = () => {
  // Sample wishlist data - replace with your actual data
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Wireless Noise Cancelling Headphones",
      price: 249.99,
      originalPrice: 299.99,
      image: "https://via.placeholder.com/300?text=Headphones",
      rating: 4.7,
      brand: "SoundMaster",
      inStock: true,
      color: "Black",
      savedForLater: false,
    },
    {
      id: 2,
      name: 'Ultra HD Smart TV 55"',
      price: 799.99,
      originalPrice: 899.99,
      image: "https://via.placeholder.com/300?text=Smart+TV",
      rating: 4.8,
      brand: "VisionPlus",
      inStock: false,
      color: "Black",
      savedForLater: true,
    },
    {
      id: 3,
      name: "Professional DSLR Camera",
      price: 1299.99,
      originalPrice: 1499.99,
      image: "https://via.placeholder.com/300?text=DSLR+Camera",
      rating: 4.9,
      brand: "PhotoPro",
      inStock: true,
      color: "Black",
      savedForLater: false,
    },
    {
      id: 4,
      name: "Wireless Charging Stand",
      price: 39.99,
      originalPrice: 49.99,
      image: "https://via.placeholder.com/300?text=Wireless+Charger",
      rating: 4.3,
      brand: "ChargeIt",
      inStock: true,
      color: "White",
      savedForLater: false,
    },
    {
      id: 5,
      name: "Smart Fitness Watch",
      price: 199.99,
      originalPrice: 249.99,
      image: "https://via.placeholder.com/300?text=Fitness+Watch",
      rating: 4.6,
      brand: "FitGear",
      inStock: true,
      color: "Blue",
      savedForLater: false,
    },
  ]);

  const [activeTab, setActiveTab] = useState("wishlist");
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareLink, setShareLink] = useState("");

  const handleRemoveFromWishlist = async (id) => {
    console.log('function called')
    const userId = localStorage.getItem("userId");
    await removeFromWishlist(userId, id);
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
    fetchWishlist();
  };

  const toggleSaveForLater = async (id) => {
    const userId = localStorage.getItem("userId");
    await toggleWishlistItem(userId, id);
    setWishlistItems(
      wishlistItems.map((item) =>
        item.id === id ? { ...item, savedForLater: !item.savedForLater } : item
      )
    );
  };

  const fetchWishlist = async () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      getWishlist(userId).then((response) => {
        console.log(response.data.data);
        setWishlistItems(response.data.data);
      });
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const moveAllToCart = async () => {
    // In a real app, you would handle the move to cart logic here
    try {
      console.log("products >>> ", filteredItems);
      const addPromises = filteredItems.map(({ _id, quantity }) =>
        addToCart(_id, quantity).catch((error) => {
          console.error(`Failed to add product ${_id} to cart:`, error);
        })
      );

      await Promise.all(addPromises);
      toast.success("All items moved to cart successfully!");
      fetchWishlist();
    } catch (error) {
      toast.error("Failed to move all items to cart:", error);
      console.error("Failed to move all items to cart:", error);
    }
  };

  const shareWishlist = () => {
    const link = `${window.location.origin}/wishlist?shared=true`;
    setShareLink(link);
    setShowShareModal(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    alert("Link copied to clipboard!");
  };

  const filteredItems = wishlistItems.filter((item) =>
    activeTab === "wishlist" ? !item.savedForLater : item.savedForLater
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Your Wishlist
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            {wishlistItems.length}{" "}
            {wishlistItems.length === 1 ? "item" : "items"} saved for later
          </p>
        </div>

        {/* Tabs and Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex border-b border-gray-200 w-full sm:w-auto">
            <button
              className={`py-4 px-6 font-medium text-sm flex items-center ${
                activeTab === "wishlist"
                  ? "border-b-2 border-indigo-500 text-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("wishlist")}
            >
              <FiHeart className="mr-2" />
              Wishlist (
              {wishlistItems.filter((item) => !item.savedForLater).length})
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm flex items-center ${
                activeTab === "saved"
                  ? "border-b-2 border-indigo-500 text-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("saved")}
            >
              <FiChevronRight className="mr-2" />
              Saved for Later (
              {wishlistItems.filter((item) => item.savedForLater).length})
            </button>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={shareWishlist}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <FiShare2 className="mr-2" />
              Share
            </button>
            {activeTab === "wishlist" && (
              <button
                onClick={moveAllToCart}
                className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Move All to Cart
              </button>
            )}
          </div>
        </div>

        {/* Wishlist Items */}
        {filteredItems.length > 0 ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <ul className="divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <li key={item.id} className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row">
                    {/* Product Image */}
                    <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                      <img
                        className="h-40 w-40 object-contain rounded-lg"
                        src={item.images?.[0]}
                        alt={item.name}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-1">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-500 mb-2">
                            Brand: {item.brand} | Color: {item.color || null}
                          </p>
                          <div className="flex items-center mb-3">
                            {[...Array(5)].map((_, i) => (
                              <FiStar
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(item.rating)
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="ml-1 text-sm text-gray-500">
                              {item.rating || 0}
                            </span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-900">
                            ${item.price.toFixed(2)}
                          </p>
                          {item.originalPrice && (
                            <p className="text-sm text-gray-500 line-through">
                              ${item.originalPrice.toFixed(2)}
                            </p>
                          )}
                          <p
                            className={`text-sm mt-1 ${
                              item.stock > 0 ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {item.stock > 0 ? "In Stock" : "Out of Stock"}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-4 flex flex-wrap gap-3">
                        <button
                          className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                            item.stock > 0
                              ? "bg-indigo-600 text-white hover:bg-indigo-700"
                              : "bg-gray-200 text-gray-700 cursor-not-allowed"
                          }`}
                          disabled={item.stock <= 0}
                        >
                          <FiShoppingCart className="mr-2" />
                          Add to Cart
                        </button>

                        <button
                          onClick={() => toggleSaveForLater(item.id)}
                          className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                          {item.savedForLater ? (
                            <>
                              <FiChevronRight className="mr-2" />
                              Move to Wishlist
                            </>
                          ) : (
                            <>
                              <FiChevronRight className="mr-2" />
                              Save for Later
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleRemoveFromWishlist(item._id)}
                          className="flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-red-600 hover:text-red-800"
                        >
                          <FiTrash2 className="mr-2" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-12 text-center">
            <FiHeart className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              {activeTab === "wishlist"
                ? "Your wishlist is empty"
                : "No items saved for later"}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {activeTab === "wishlist"
                ? "Start adding items you love to your wishlist"
                : "Save items for later to find them here"}
            </p>
            <div className="mt-6">
              <button
                onClick={() =>
                  setActiveTab(activeTab === "wishlist" ? "saved" : "wishlist")
                }
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                {activeTab === "wishlist"
                  ? "View Saved for Later items"
                  : "View Wishlist items"}
                <FiChevronRight className="ml-2" />
              </button>
            </div>
          </div>
        )}

        {/* Recommendations Section */}
        {filteredItems.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              You might also like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => {
                const recItem = wishlistItems.find((item) => item.id === i) || {
                  id: i,
                  name: `Recommended Product ${i}`,
                  price: 99.99 + i * 20,
                  image: `https://via.placeholder.com/300?text=Rec+${i}`,
                  rating: 4.0 + i * 0.2,
                  brand: "BrandX",
                  inStock: true,
                };
                return (
                  <div
                    key={i}
                    className="bg-white rounded-lg shadow overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
                        <img
                          src={recItem.image}
                          alt={recItem.name}
                          className="w-full h-48 object-contain"
                        />
                      </div>
                      <h3 className="mt-4 text-sm font-medium text-gray-900 line-clamp-2">
                        {recItem.name}
                      </h3>
                      <div className="mt-1 flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(recItem.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="ml-1 text-xs text-gray-500">
                          ({recItem.rating})
                        </span>
                      </div>
                      <p className="mt-1 text-lg font-medium text-gray-900">
                        ${recItem.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-3 flex justify-between">
                      <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                        <FiHeart className="inline mr-1" /> Wishlist
                      </button>
                      <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                        <FiShoppingCart className="inline mr-1" /> Add to cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-center">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-title"
                      >
                        Share Your Wishlist
                      </h3>
                      <button
                        onClick={() => setShowShareModal(false)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <FiX className="h-6 w-6" />
                      </button>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 mb-4">
                        Share this link with friends and family so they can see
                        your wishlist:
                      </p>
                      <div className="flex">
                        <input
                          type="text"
                          readOnly
                          value={shareLink}
                          className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <button
                          onClick={copyToClipboard}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowShareModal(false)}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
