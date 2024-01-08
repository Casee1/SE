import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useUser} from '../context/UserContext';
import {Buffer} from "buffer";
import scrypt from "scrypt-js";


const Register = () => {
  const navigate = useNavigate();
  const {setUser} = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userLikedMovies, setUserLikedMovies] = useState([]);
  const [userDislikedMovies, setUserDislikedMovies] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    async function hashPassword(password, salt) {
      const passwordBuffer = Buffer.from(password);
      const saltBuffer = Buffer.from(salt);
      const keyLengthBytes = 32; // Desired length of the derived key in bytes

      // N: CPU cost, r: Memory cost, p: Parallelization cos
      const N = 16384, r = 8, p = 1;

      const derivedKey = await scrypt.scrypt(passwordBuffer, saltBuffer, N, r, p, keyLengthBytes);
      return Buffer.from(derivedKey).toString('hex');
    }


    try {
      hashPassword(password, "M0!e#n3i4").then(async hashedPassword => {
        console.log(hashedPassword);
        const response = await fetch("http://localhost:8080/api/v1/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: hashedPassword,
            userLikedMovies: userLikedMovies,
            userDislikedMovies: userDislikedMovies,
          }),
        });

        if (response.ok) {
          // Handle successful registration (redirect, set state, etc.)
          console.log("Registration successful");
          setUser(username);
          navigate("/");
        } else {
          // Handle registration error
          console.error("Registration failed");
        }
      });
    } catch (error) {
      console.error("Error during registration:", error);
    }


  };


  return (
      <div className="auth-form-container">
        <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
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
          <button type="submit">Register</button>
        </form>
      </div>
  );
};

export default Register;
