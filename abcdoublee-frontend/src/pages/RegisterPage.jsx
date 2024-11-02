import  { useState } from "react";
import { registerUser } from "../api/api";
import "./RegisterPage.css"; 

const RegisterPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await registerUser(userName, password, fullName);
      setMessage("Account created successfully! Please log in.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="register-page">
      <h2>Create an Account</h2>
      <form className="register-form" onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {message && <p className="error-message">{message}</p>}
    </div>
  );
};

export default RegisterPage;
