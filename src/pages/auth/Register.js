import RegisterForm from "../../components/shared/RegisterForm.js";

const Register = () => {
  return (
    <div className="login-page">
      <div className="login-title">
        <h1>My budget</h1>
      </div>
      <div className="login-form">
        <RegisterForm />
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
