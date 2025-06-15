import axios from 'axios';
import constants from '../config/constanst';

export const signupUser = async ({ fullName, mobile, username, email, password, confirmPassword, }) => {
  const response = await axios.post(`${constants.API_URL}/user/register`, {
    fullName, mobile, username, email, password, confirmPassword
  });
  return response;
};

export const signinUser = async ({ identifier, password }) => {
  const response = await axios.post(`${constants.API_URL}/auth/login`, {
    identifier,
    password,
  });
  return response;
};

export const forgetPassword = async ({ email }) => {
  const response = await axios.post(`${constants.API_URL}/auth/forgot-password`, {
    email,
  });
  return response;
};


export const resetPassword = async ({ token, newPassword, confirmPassword }) => {
  const response = await axios.post(`${constants.API_URL}/auth/reset-password`, {
    token,
    newPassword,
    confirmPassword,
  });
  return response;
};

export const getHome = async () => {
  try {
    const response = await axios.get(`${constants.API_URL}/user/home`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserDetails = async ({ username }) => {
  try {
    const response = await axios.get(`${constants.API_URL}/user/${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const updateUserDetails = async ({ username, fullName, email, mobile }) => {
  console.log("hello", username, fullName, email, mobile);
  try {
    const response = await axios.put(`${constants.API_URL}/user/${username}`, { fullName, email, mobile });
    return response.data;
  } catch (error) {
    throw error;
  }
};


