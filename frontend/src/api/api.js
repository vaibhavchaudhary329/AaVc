// src/api/api.js (or wherever your api.js is located)
import axios from 'axios';
import constants from '../config/constanst'; // Make sure this path is correct

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: constants.API_URL, // Ensure constants.API_URL is correctly defined (e.g., http://localhost:8080)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the JWT token from localStorage to outgoing requests
api.interceptors.request.use(
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

// Response interceptor to handle 401 Unauthorized errors globally
// If a protected API call returns 401, it will clear the token and redirect to signin.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("[API Interceptor] Unauthorized request. Token might be expired or invalid. Redirecting to signin.");
      localStorage.removeItem('token'); // Clear the invalid token
      // Using window.location.href to force a full page reload and navigation
      //window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

// Export functions that use THIS 'api' instance
export const signupUser = async (data) => {
  const response = await api.post('/user/register', data); // Use 'api.post'
  return response;
};

export const signinUser = async (data) => {
  console.log("Data: ", data)
  const response = await api.post('/auth/login', data);
  return response;
};

export const forgetPassword = async (data) => {
  const response = await api.post('/auth/forgot-password', data); // Use 'api.post'
  return response;
};

export const resetPassword = async (data) => {
  const response = await api.post('/auth/reset-password', data); 
  return response;
};

export const getHome = async () => {
  try {
    const response = await api.get('/user/home');
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getProducts = async () => {
  try {
    const response = await api.get('api/products'); // <-- CRITICAL: NOW USES 'api.get'
    return response.data; // Ensure your backend returns the raw string "Welcome User!" or similar
  } catch (error) {
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await api.get('api/categories'); // <-- CRITICAL: NOW USES 'api.get'
    return response.data; // Ensure your backend returns the raw string "Welcome User!" or similar
  } catch (error) {
    throw error;
  }
};


export const getProductByCategory = async (categoryId) => {
  try {
    const response = await api.get(`api/products/category/${categoryId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getSearch = async (query) => {
  try {
    const response = await api.get(`/api/products/search?q=${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};





export const getUserDetails = async ({ identifier }) => {
  try {
    const response = await api.get(`/user/${identifier}`);
    console.log("RES:", response);
    return response.data;
  } catch (error) {
    console.log("ERR:", error);
    throw error;
  }
};

export const updateUserDetails = async ({ identifier, fullName, email, mobile }) => {
  try {
    const response = await api.put(`/user/${identifier}`, {
      fullName,
      email,
      mobile
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const changePassword = async (data) => {
  console.log("from change pswd api", data);
  try {
    const response = await api.post(`/user/change-password`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getUserEmail = async () => {
  try {
    const response = await api.get('/auth/oauth2-success');
    return response.data;
  } catch (error) {
    throw error;
  }
};
