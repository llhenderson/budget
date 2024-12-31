import Button from "../../components/shared/Button";
import LoginForm from "../../components/shared/LoginForm";
const Login = () => {
  return (
    <div className="login-page">
      <div className="login-title">
        <h1>My budget</h1>
      </div>
      <div className="login-form">
        <LoginForm />
      </div>
      <div className="login-button">
        <Button title="Login" />
      </div>
      <div className="login-options">
        <p>
          <a href="https://www.facebook.com" className="custom-link">
            Register
          </a>
        </p>
        <p>
          reset{" "}
          <a href="https://www.facebook.com" className="custom-link">
            password
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
