import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "./LoginForm";

// Mock für die Login-Funktion
const mockLogin = jest.fn();

jest.mock("../../helper/fetchApi", () => ({
  login: mockLogin,
}));

describe("LoginForm", () => {
  test("submits the form with correct values", () => {
    render(<LoginForm />);

    // Simuliere Benutzereingaben
    const usernameInput = screen.getByPlaceholderText("Username");
    fireEvent.change(usernameInput, { target: { value: "testuser" } });

    const passwordInput = screen.getByPlaceholderText("Password");
    fireEvent.change(passwordInput, { target: { value: "password1234" } });

    // Simuliere den Klick auf die Schaltfläche
    const submitButton = screen.getByText("Log in");
    fireEvent.click(submitButton);

    // Überprüfe, ob die FieldValues an die onSubmit-Funktion übergeben wurden
    expect(mockLogin).toHaveBeenCalledWith({
      username: "testuser",
      password: "password1234",
    });
  });
});
