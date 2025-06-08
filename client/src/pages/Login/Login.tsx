import React, { useState } from "react";
import "../../styles/Login.scss";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
          await login( username, password);
          navigate("/home");
        } catch (error) {
          console.log(error);
        }
    
    // Add login logic here
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <button className="register-btn" onClick={() => {navigate('/register')}}>register</button>
      </form>
    </div>
  );
}
