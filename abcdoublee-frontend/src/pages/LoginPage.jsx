import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/api.jsx';
import './LoginPage.css'; 
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

function LoginPage() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const handleLogin = async () => {
    try {
      const token = await loginUser(userName, password); // calling api.jsx
      login(token);
      navigate('/user'); 
    } catch (error) {
      alert(error.message || 'Login failed'); 
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <div className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default LoginPage;
