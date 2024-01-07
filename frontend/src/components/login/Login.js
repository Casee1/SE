import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser }  from '../context/UserContext';

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userLikedMovies, setUserLikedMovies] = useState([]);
    const [userDislikedMovies, setUserDislikedMovies] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          userLikedMovies: userLikedMovies,
          userDislikedMovies: userDislikedMovies,
        }),
      });

      if (response.ok) {
        // Handle successful login (redirect, set state, etc.)
        console.log("Login successful");
        setUser(username);
        navigate("/");
      } else {
        // Handle login error
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="username"
          placeholder="username"
          id="username"
          name="username"
        />
        <label htmlFor="password">password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
