import axios from 'axios';

const API_BASE_URL = "http://localhost:5105/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    //console.log("Token set in headers:", apiClient.defaults.headers.common['Authorization']);
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

// Register User Function
export const registerUser = async (userName, password, fullName) => {
  try {
    const response = await apiClient.post('/authentication/register', {
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
    const response = await apiClient.post('/authentication/login', {
      userName,
      password,
    });
    const token = response.data.token.result;
    //localStorage.setItem('token', token);
    localStorage.setItem('token', token);
    setAuthToken(token); 
    return token;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Login failed";
    throw new Error(errorMessage);
  }
};


export const logoutUser = () => {
 localStorage.removeItem('token');
 setAuthToken(null);
}
