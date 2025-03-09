import axios from "axios";

const API_URL = "https://fakestoreapi.com/carts";

// Fetch all carts
export const fetchCarts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Fetch single cart details
export const fetchCartById = async (cartId) => {
  const response = await axios.get(`${API_URL}/${cartId}`);
  return response.data;
};

// Add new cart
export const addCart = async (cartData) => {
  const response = await axios.post(API_URL, cartData);
  return response.data;
};

// Update existing cart
export const updateCart = async (cartId, cartData) => {
  const response = await axios.put(`${API_URL}/${cartId}`, cartData);
  return response.data;
};

// Delete cart
export const deleteCart = async (cartId) => {
  await axios.delete(`${API_URL}/${cartId}`);
};
