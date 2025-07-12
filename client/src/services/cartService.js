import axios from "axios";
import SERVER_URL from "../../config";

export const addToCart = async (product) => {
  const token = localStorage.getItem("token");
  const productId = product._id;
  try {
    const response = await axios.post(
      `${SERVER_URL}/cart`,
      {
        productId,
        quantity: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    alert("Couldn't add to cart");
    console.log(error.message);
  }
};

export const getCartProducts = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${SERVER_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    alert("Couldn't fetch cart items");
    console.log(error.message);
  }
};

export const updateCartQuantity = async (productId, quantity) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.put(
      `${SERVER_URL}/cart`,
      {
        productId,
        quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const removeFromCart = async (productId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.delete(`${SERVER_URL}/cart/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
