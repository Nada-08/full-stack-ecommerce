import axios from "axios";
import SERVER_URL from "../../config";

export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${SERVER_URL}/auth/signup`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { message: "Something went wrong during signup." }
    );
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${SERVER_URL}/auth/login`, {
      email,
      password,
    });
    return response.data
  } catch (error) {
    throw (
      error.response?.data || { message: "Something went wrong during login." }
    );
  }
};
