import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";
// ... your test file ...

it("should render the login form", () => {
  render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>
  );

  // Assertions to check if elements within LoginForm are rendered
  expect(screen.getByLabelText("username")).toBeInTheDocument();
  expect(screen.getByLabelText("password")).toBeInTheDocument();
});
