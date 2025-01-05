import { useState } from "react";
import Button from "./Button";
const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Get error message from server
        throw new Error(errorData.error || "Network response was not ok");
      }

      const data = await response.json();
      console.log(data.message); // Log success message
      // Optionally, redirect the user or show a success message
    } catch (error) {
      console.error("There was a problem with the registration:", error);
      // Display error message to the user (e.g., using an alert or state variable)
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ textAlign: "center" }}>
        <p>
          Your Budgeting Journey Starts Here
          <b>
            <br /> Register to get started!
          </b>
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
        <lable htmlFor="password">password</lable>
        <input
          id="password"
          placeholder="password"
          value={password}
          className="login-input"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={handleRegister}>Register</Button>
      </div>
    </div>
  );
};

export default RegisterForm;
