import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "../components/LoginForm/LoginForm";

describe("LoginForm", () => {
  test("submits the form with correct values", () => {
    // Moch-Funktion für onSubmit
    const mockOnSubmit = jest.fn();

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
    expect(mockOnSubmit).toHaveBeenCalledWith({
      username: "testuser",
      password: "password1234",
    });
  });
});
