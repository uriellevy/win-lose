import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { fetchEntries, addEntry } from '../../api/entries';
import '../../styles/Home.scss'
import { logout } from '../../api/auth';
import type { TTransactionType } from '../../interfaces/transaction';

interface Entry {
  _id: string;
  value: number;
}

export default function Home() {
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<TTransactionType>("WIN");
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  // useEffect(() => {
  //   if (!token) {
  //     navigate('/login');
  //     return;
  //   }

  //   const fetchEntries = async () => {
  //     try {
  //       const res = await fetchEntries();
  //       // setEntries(res.data.entries);
  //     } catch (err) {
  //       alert('שגיאה בטעינת נתונים');
  //     }
  //   };

  //   fetchEntries();
  // }, [token, navigate]);

  const handleLogout = async () => {
    try {
      await logout()
      navigate("/")
      
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await addEntry({amount ,type});
    } catch (err) {
      alert('שגיאה בהוספת סכום');
    }
  };

  return (
    <div className='home-container'>
      <h2>ברוך הבא</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="הכנס סכום"
        />
        <select name="dropdown" id="dropdown" onChange={(e) => setType(e.target.value as TTransactionType)}>
          <option value="WIN">Win</option>
          <option value="LOSE">Lose</option>
        </select>
        <button type="submit">הוסף</button>
      </form>
      <button className='logout-btn' onClick={handleLogout}>Logout</button>
    </div>
  );
}