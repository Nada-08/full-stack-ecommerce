import { useEffect, useState } from "react";
import { fetchRecentProducts } from "../services/productService.jsx";

const RecentProductsSlider = () => {
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    const getRecent = async () => {
      try {
        const products = await fetchRecentProducts(3);
        setRecentProducts(products);
      } catch (error) {
        console.error("Failed to fetch recent products:", error);
      }
    };

    getRecent();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {recentProducts.map((product) => (
        <div
          key={product._id}
          className="bg-white rounded-lg shadow-md p-4 flex flex-col"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-40 object-cover mb-4 rounded"
          />
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600">{product.description}</p>
          <span className="mt-auto text-amber-600 font-bold">
            ${product.price}
          </span>
        </div>
      ))}
    </div>
  );
};

export default RecentProductsSlider;
