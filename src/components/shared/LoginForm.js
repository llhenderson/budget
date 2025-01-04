import { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { Label } from "recharts";
const LoginForm = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        // This is where you handle the error
        const errorData = await response.json(); // Try to parse JSON error from server

        throw new Error(errorData.message || "Login failed");
      }

      // Successful login
      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate("/home");
    } catch (error) {
      console.error("There was a problem with the login:", error);
      // TODO: Display an error message to the user
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {errorMessage && (
        <div className="popup">
          <p>{errorMessage}</p>
          <button onClick={() => setErrorMessage(null)}>Close</button>
        </div>
      )}
      <div style={{ textAlign: "center" }}>
        <p>
          <b>Access Your Budget Now</b> <br /> Sign In & See Your Financial
          Overview
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 30,
        }}
      >
        <label htmlFor="username">username</label>
        <input
          id="username"
          placeholder="username"
          value={username}
          className="login-input"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">password</label>
        <input
          id="password"
          placeholder="password"
          value={password}
          className="login-input"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={handleLogin}>Login</Button>
      </div>
    </div>
  );
};

export default LoginForm;
