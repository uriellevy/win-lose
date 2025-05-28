import React, { useState } from 'react';
import '../../styles/Register.scss';

export default function Register() {
  const [mail, setMail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email:', mail);
    console.log('Username:', username);
    console.log('Password:', password);
    // Add registration logic here
  };

  return (
    <div className='register-page'>
      <form className='register-form' onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className='form-group'>
          <label htmlFor='mail'>Email</label>
          <input
            type='email'
            id='mail'
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type='submit'>Register</button>
      </form>
    </div>
  );
}