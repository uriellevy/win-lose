import axios from 'axios';
import type { IRegisterForm } from '../interfaces/users';

const API_URL = 'http://localhost:5000';

export const register = async (formData:IRegisterForm) => {
  return axios.post(`${API_URL}/register`, formData);
};

export const login = async (username: string, password: string) => {
  const res = await axios.post(`${API_URL}/login`, { username, password });
  localStorage.setItem('token', res.data.token);
};