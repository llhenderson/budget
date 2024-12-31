import Button from "../../components/shared/Button";
import LoginForm from "../../components/shared/LoginForm";
const Register = () => {
  return (
    <div className="login-page">
      <div className="login-title">
        <h1>My budget</h1>
      </div>
      <div className="login-form">
        <LoginForm />
      </div>
      <div className="login-button">
        <Button title="Register" />
      </div>
      <div className="login-options">
        <p>
          <a href="/" className="custom-link">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
