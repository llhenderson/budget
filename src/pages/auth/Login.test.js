import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "./Login";

test("renders the correct text in the div", () => {
  render(<Login />);
  const divElement = screen.getByText("Login"); // Replace with your expected text
  expect(divElement).toBeInTheDocument();
});
