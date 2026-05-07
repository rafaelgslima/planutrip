import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { GoogleAuthButton } from ".";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "login.googleSignIn": "Sign in with Google",
        "login.continueGoogle": "Continue with Google",
        "login.signingInGoogle": "Signing in...",
      };
      return translations[key] || key;
    },
  }),
}));

describe("GoogleAuthButton", () => {
  it("renders the button with Google icon", () => {
    const handleClick = vi.fn();
    render(<GoogleAuthButton onClick={handleClick} />);

    const button = screen.getByRole("button", { name: /sign in with google/i });
    expect(button).toBeInTheDocument();
  });

  it("displays the continue text by default", () => {
    const handleClick = vi.fn();
    render(<GoogleAuthButton onClick={handleClick} />);

    expect(screen.getByText("Continue with Google")).toBeInTheDocument();
  });

  it("displays loading text when isLoading is true", () => {
    const handleClick = vi.fn();
    render(<GoogleAuthButton isLoading={true} onClick={handleClick} />);

    expect(screen.getByText("Signing in...")).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<GoogleAuthButton onClick={handleClick} />);

    const button = screen.getByRole("button");
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("disables button when isLoading is true", () => {
    const handleClick = vi.fn();
    render(<GoogleAuthButton isLoading={true} onClick={handleClick} />);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("shows loading spinner when isLoading is true", () => {
    const handleClick = vi.fn();
    const { container } = render(<GoogleAuthButton isLoading={true} onClick={handleClick} />);

    const spinner = container.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });
});
