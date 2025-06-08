import axios from 'axios';
import type { ITransactionForm } from '../interfaces/transaction';

const API_URL = 'http://localhost:5000/api/transactions';

export const fetchEntries = async () => {
  const res = await axios.get(`${API_URL}`,{
    withCredentials: true
  });
  return res.data;
};

export const addEntry = async (formData:ITransactionForm) => {
  try {
    const res = await axios.post(`${API_URL}/`, formData, {
      withCredentials: true
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};