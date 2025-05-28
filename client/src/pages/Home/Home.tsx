import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { fetchEntries, addEntry } from '../../api/entries';
import '../../styles/Home.scss'

interface Entry {
  _id: string;
  value: number;
}

export default function Home() {
  const [amount, setAmount] = useState<number>(0);
  const [entries, setEntries] = useState<Entry[]>([]);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await addEntry(amount);
      setEntries([...entries, res.data.newEntry]);
      setAmount(0);
    } catch (err) {
      alert('שגיאה בהוספת סכום');
    }
  };

  const total = entries.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <div>
      <h2>ברוך הבא</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="הכנס סכום"
        />
        <button type="submit">הוסף</button>
      </form>

      <h3>סכום כולל: {total}</h3>
      <ul>
        {entries.map((entry) => (
          <li key={entry._id}>{entry.value}</li>
        ))}
      </ul>
    </div>
  );
}