import axios from 'axios';
const API_BASE_URL = "http://localhost:5105/api/authentication";

// Register User Function
export const registerUser = async (userName, password, fullName) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, {
      userName,
      password,
      fullName,
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Registration failed";
    throw new Error(errorMessage);
  }
};

// Login User Function
export const loginUser = async (userName, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      userName,
      password,
    });
    const token =  response.data.token;
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return token
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Login failed";
    throw new Error(errorMessage);
  }
};

export const logoutUser = () => {
 localStorage.removeItem('token');
 delete axios.defaults.headers.common['Authorization'];
}
