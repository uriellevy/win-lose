import axios from 'axios';
import type { IRegisterForm } from '../interfaces/users';

const API_URL = `${import.meta.env.VITE_API_URL}users`;

export const register = async (formData:IRegisterForm) => {
  return await axios.post(`${API_URL}/register`, formData);
};

export const login = async (username: string, password: string) => {
  const res = await axios.post(`${API_URL}/login`, { userName:username, password }, {
    withCredentials: true,
  });
  localStorage.setItem('token', res.data.token);
};

export const logout = async () => {
  return await axios.post(`${API_URL}/logout`, null, {
    withCredentials: true,
  })
}