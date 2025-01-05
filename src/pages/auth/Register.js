import login_main from "../../public/login_main.jpg";
import RegisterForm from "../../components/shared/RegisterForm.js";
const Register = () => {
  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${login_main})`,
        height: 700,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="login-title" style={{ flex: 1 }}>
        <div style={{ width: "50%", marginLeft: "30%" }}>
          <h1>Start Budgeting!</h1>
          <p>
            <em>
              Set and track financial goals,
              <br /> whether it's saving for a down payment, paying off debt, or
              building an emergency fund.
            </em>
          </p>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            backgroundColor: "white",
            width: "50%",
          }}
        >
          <div className="login-form">
            <RegisterForm />
          </div>
          <div className="login-options">
            <div>
              <p>
                <a href="/" className="custom-link">
                  Login
                </a>
              </p>
            </div>

            <p>
              reset{" "}
              <a href="https://www.facebook.com" className="custom-link">
                password
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
