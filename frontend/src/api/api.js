import axios from 'axios';
import constants from '../config/constanst';

export const signupUser = async ({ username, email, password, confirmPassword }) => {
  const response = await axios.post(`${constants.API_URL}/user/register`, {
    username,
    email,
    password,
    confirmPassword,
  });
  return response;
};

export const signinUser = async ({ username, email, password, confirmPassword }) => {
  const response = await axios.post(`${constants.API_URL}/user/register`, {
    username,
    email,
    password,
    confirmPassword,
  });
  return response;
};

