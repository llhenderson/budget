import Button from "../../components/shared/Button";
import LoginForm from "../../components/shared/LoginForm";
const Login = () => {
  return (
    <div className="login-page">
      <div className="login-title">My budget</div>
      <div className="login-form">
        <LoginForm />
      </div>
      <div className="login-button">
        <Button title="Login" />
      </div>
      <div className="login-options">login options</div>
    </div>
  );
};

export default Login;
