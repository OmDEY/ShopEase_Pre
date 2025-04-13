import React, { useEffect, useState } from "react";
import { ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { fetchBundleOffers } from "../../services/api";

export default function BundleOffersPage() {
  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBundles = async () => {
      try {
        const res = await fetchBundleOffers(); // Adjust the endpoint as needed
        console.log("res >>>", res);
        setBundles(res);
      } catch (err) {
        console.error("Failed to fetch bundle offers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBundles();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 py-12 px-4 sm:px-8">
      <h1 className="text-4xl sm:text-5xl font-bold text-center mb-12 text-purple-800 drop-shadow-lg">
        🌟 Exclusive Bundle Offers 🌟
      </h1>

      {loading ? (
        <p className="text-center text-purple-700 font-medium text-lg">
          Loading offers...
        </p>
      ) : bundles.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No bundle offers available at the moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {bundles.map((bundle, index) => {
            const details = bundle.bundleDetails;

            return (
              <motion.div
                key={bundle._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="rounded-2xl shadow-xl overflow-hidden border-0 bg-white"
              >
                <img
                  src={bundle.images?.[0] || "https://via.placeholder.com/400"}
                  alt={details.bundleName}
                  className="h-56 w-full object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-purple-900 mb-2">
                    {details.bundleName}
                  </h2>
                  <p className="text-sm text-gray-600 mb-2">
                    {details.bundleDescription}
                  </p>
                  <ul className="text-gray-700 text-sm mb-4 list-disc list-inside">
                    {details.includedProducts?.map((p, i) => (
                      <li key={p._id || i}>{p.title}</li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-lg font-bold text-green-600">
                        ₹{details.bundlePrice}
                      </span>
                      {bundle.price && (
                        <span className="line-through text-gray-400 ml-2">
                          ₹{bundle.price}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-yellow-500">
                      <Star size={16} className="mr-1" />{" "}
                      {bundle.averageRating?.toFixed(1) || "4.5"}
                    </div>
                  </div>
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-xl shadow-md flex items-center justify-center">
                    <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
