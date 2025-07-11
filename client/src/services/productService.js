import axios from "axios";
import SERVER_URL from "../../config";

export const fetchRecentProducts = async (count = 3) => {
  const response = await axios(`${SERVER_URL}/products/recent/${count}`);
  return response.data.products;
};

export const fetchAllProducts = async () => {
  const response = await axios(`${SERVER_URL}/products`);
  return response.data.products;
};
