import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/auth';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(username, password);
      // localStorage.setItem('token', res.data.token);
      navigate('/home');
    } catch (err) {
      alert('שגיאה בהתחברות');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>התחברות</h2>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="שם משתמש" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="סיסמה" />
      <button type="submit">התחבר</button>
    </form>
  );
}