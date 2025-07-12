import { FaStar, FaShoppingCart } from "react-icons/fa";
import { addToCart } from "../services/cartService";
import MessageToast from "./MessageToast.jsx";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [toastMsg, setToastMsg] = useState("");

  const handleCart = async (e) => {
    e.preventDefault();

    if (user) {
      const response = await addToCart(product);
      if (response?.success) {
        setToastMsg("Product added successfully");
      } else {
        setToastMsg(response?.message || "Failed to add to cart.");
      }
    } else {
      setToastMsg("You need to login first");
    }
  };

  return (
    <div className="flex flex-col overflow-hidden bg-white shadow-md rounded-3xl">
      <></>
      <img
        src={product.image}
        alt={product.name}
        className="object-cover w-full h-48"
      />
      <div className="flex flex-col gap-2 p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="font-bold text-amber-500">${product.price}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`h-4 w-4 ${
                  i < Math.round(product.rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-1 text-sm text-gray-500">
              ({product.numReviews})
            </span>
          </div>
          <a
            onClick={handleCart}
            className="p-1.5 bg-amber-500 rounded-3xl text-white hover:bg-violet-600"
          >
            <FaShoppingCart size={22} />
          </a>
        </div>
      </div>
      {toastMsg && (
        <MessageToast
          message={toastMsg}
          onClose={() => setToastMsg("")}
          type={toastMsg.includes("success") ? "success" : "error"}
        />
      )}
    </div>
  );
};

export default ProductCard;
