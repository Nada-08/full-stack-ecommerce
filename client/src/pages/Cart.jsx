import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCartProducts } from "../services/cartService";
import CartItemCard from "../components/CartItemCard.jsx";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    const response = await getCartProducts();
    if (response.success) {
      setCartItems(response.cart.items);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      fetchCartItems();
    }
  }, []);

  return (
    <div className="p-6">
      <h2 className="mb-4 text-2xl font-semibold">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cartItems.map((item) => (
            <CartItemCard
              key={item._id}
              cartItem={item}
              onUpdate={fetchCartItems}
            />
          ))}
        </div>
      )}
      {cartItems.length > 0 && (
        <button
          onClick={() => navigate("/checkout")}
          className="fixed px-5 py-3 text-white transition rounded-full shadow-lg bottom-6 right-6 bg-amber-500 hover:bg-amber-600"
        >
          Proceed to Checkout
        </button>
      )}
    </div>
  );
};

export default Cart;
