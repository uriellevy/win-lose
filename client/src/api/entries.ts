import axios from 'axios';

const API_URL = 'http://localhost:5000';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const fetchEntries = async () => {
  const res = await axios.get(`${API_URL}/entries`, getAuthHeader());
  return res.data.entries;
};

export const addEntry = async (amount: number) => {
  const res = await axios.post(`${API_URL}/entry`, { amount }, getAuthHeader());
  return res.data.newEntry;
};