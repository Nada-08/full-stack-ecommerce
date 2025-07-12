import { FaStar, FaTrashAlt } from "react-icons/fa";
import { removeFromCart, updateCartQuantity } from "../services/cartService";

const CartItemCard = ({ cartItem, onUpdate }) => {
  const { product, quantity } = cartItem;

  const handleQuantityChange = async (change) => {
    const newQuantity = quantity + change;
    if (newQuantity < 1) return;
    await updateCartQuantity(product._id, newQuantity);
    onUpdate();
  };

  const handleRemove = async () => {
    await removeFromCart(product._id);
    onUpdate();
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white border border-gray-200 shadow-xl rounded-3xl">
      <img
        src={product.image}
        alt={product.name}
        className="object-cover w-full h-40 border border-transparent rounded-md round"
      />

      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="font-bold text-green-600">${product.price}</p>
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
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleQuantityChange(-1)}
            className="px-2 py-1 rounded text-md"
          >
            −
          </button>
          <span className="text-sm font-medium">{quantity}</span>
          <button
            onClick={() => handleQuantityChange(1)}
            className="px-2 py-1 rounded text-md "
          >
            +
          </button>
        </div>
        <button
          className="text-red-500 transition hover:text-red-700"
          title="Remove from cart"
          onClick={handleRemove}
        >
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;
