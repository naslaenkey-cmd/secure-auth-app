import axios from "axios";

const API_URL = "http://localhost:3000/users";

export const registerUser = async (userData) => {
  const response = await axios.post(API_URL, userData);
  return response.data;
};

export const loginUser = async (email) => {
  const response = await axios.get(
    `${API_URL}?email=${encodeURIComponent(email)}`
  );

  return response.data;
};

export const getUserById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);

  return response.data;
};

export const checkUsername = async (username) => {
  const response = await axios.get(
    `${API_URL}?username=${encodeURIComponent(username)}`
  );

  return response.data;
};