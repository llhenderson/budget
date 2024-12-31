import { useState } from "react";

const LoginForm = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <input
        placeholder="username"
        value={username}
        className="login-input"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="password"
        value={password}
        className="login-input"
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );
};

export default LoginForm;
