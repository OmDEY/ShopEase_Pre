import React, { useState, useEffect } from "react";
import { fetchAllProducts, updateBundleOffer } from "../../services/api";
import { toast } from "react-toastify"; // Optional: for better notifications

const AdminBundleOfferPage = () => {
  const [products, setProducts] = useState([]);
  const [bundleOffer, setBundleOffer] = useState({
    isBundleOffer: false,
    bundleName: "",
    bundleDescription: "",
    bundlePrice: 0,
    includedProducts: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Fetch products with pagination
  const fetchProducts = (page = 1) => {
    setLoading(true);
    fetchAllProducts(page, productsPerPage)
      .then((response) => {
        setProducts(response.data.products);
        setTotalPages(Math.ceil(response.data.totalProducts / productsPerPage));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        toast.error("Error fetching products");
        setLoading(false);
      });
  };

  // Fetch products on page load and when currentPage changes
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBundleOffer((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleProductSelection = (productId) => {
    setBundleOffer((prevState) => {
      const newIncludedProducts = prevState.includedProducts.includes(productId)
        ? prevState.includedProducts.filter((id) => id !== productId)
        : [...prevState.includedProducts, productId];

      return { ...prevState, includedProducts: newIncludedProducts };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (bundleOffer.includedProducts.length === 0) {
      toast.error(
        "Please select at least one product to include in the bundle"
      );
      return;
    }

    const mainProductId = bundleOffer.includedProducts[0]; // use first product as primary

    console.log("Submitting bundle offer for:", mainProductId);
    console.log("bundleOffer:", bundleOffer);

    updateBundleOffer(mainProductId, {
      isBundleOffer: bundleOffer.isBundleOffer,
      bundleDetails: {
        bundleName: bundleOffer.bundleName,
        bundleDescription: bundleOffer.bundleDescription,
        bundlePrice: bundleOffer.bundlePrice,
        includedProducts: bundleOffer.includedProducts,
      },
    })
      .then((response) => {
        toast.success("Bundle offer updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating bundle offer:", error);
        toast.error("Error updating bundle offer");
      });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Admin Bundle Offer
      </h1>

      {/* Product List */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          Select Products for Bundle Offer
        </h2>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="font-semibold text-xl">{product.title}</h3>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="font-bold text-lg">Price: ${product.price}</p>
                <div>
                  <label className="flex items-center mt-4">
                    <input
                      type="checkbox"
                      checked={bundleOffer.includedProducts.includes(
                        product._id
                      )}
                      onChange={() => handleProductSelection(product._id)}
                      className="mr-2"
                    />
                    Add to bundle offer
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg mr-2"
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="px-4 py-2 text-lg">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="px-4 py-2 bg-blue-600 text-white rounded-lg ml-2"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Bundle Offer Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold mb-4">
          Create/Update Bundle Offer
        </h2>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">
            <input
              type="checkbox"
              name="isBundleOffer"
              checked={bundleOffer.isBundleOffer}
              onChange={handleChange}
              className="mr-2"
            />
            Is this a bundle offer?
          </label>
        </div>

        {bundleOffer.isBundleOffer && (
          <>
            <div className="mb-4">
              <label className="block font-semibold">Bundle Name:</label>
              <input
                type="text"
                name="bundleName"
                value={bundleOffer.bundleName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold">Bundle Description:</label>
              <textarea
                name="bundleDescription"
                value={bundleOffer.bundleDescription}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold">Bundle Price:</label>
              <input
                type="number"
                name="bundlePrice"
                value={bundleOffer.bundlePrice}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold"
        >
          Save Bundle Offer
        </button>
      </form>
    </div>
  );
};

export default AdminBundleOfferPage;
