import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { DeleteAccountModal } from "./index";
import { useDeleteAccount } from "@/hooks/useDeleteAccount";

vi.mock("@/hooks/useDeleteAccount", () => ({
  useDeleteAccount: vi.fn(),
}));

describe("DeleteAccountModal", () => {
  const mockDeleteAccount = vi.fn();
  const mockUseDeleteAccount = vi.mocked(useDeleteAccount);

  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseDeleteAccount.mockReturnValue({
      deleteAccount: mockDeleteAccount,
      isDeleting: false,
      error: null,
    });
  });

  it("does not render when isOpen is false", () => {
    const { container } = render(
      <DeleteAccountModal isOpen={false} onClose={vi.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders modal when isOpen is true", () => {
    render(<DeleteAccountModal {...defaultProps} />);
    expect(screen.getByText("Delete Account?")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const mockOnClose = vi.fn();
    render(<DeleteAccountModal {...defaultProps} onClose={mockOnClose} />);

    const closeButton = screen.getByLabelText("Close");
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("calls onClose when cancel button is clicked", () => {
    const mockOnClose = vi.fn();
    render(<DeleteAccountModal {...defaultProps} onClose={mockOnClose} />);

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("has delete button disabled until confirmation text is entered", () => {
    render(<DeleteAccountModal {...defaultProps} />);

    const deleteButton = screen.getByText("Delete Account Permanently");
    expect(deleteButton).toBeDisabled();
  });

  it("enables delete button when correct confirmation text is entered", async () => {
    render(<DeleteAccountModal {...defaultProps} />);

    const input = screen.getByPlaceholderText("delete my account");
    fireEvent.change(input, { target: { value: "delete my account" } });

    const deleteButton = screen.getByText("Delete Account Permanently");
    await waitFor(() => {
      expect(deleteButton).not.toBeDisabled();
    });
  });

  it("shows error message when text does not match exactly", async () => {
    render(<DeleteAccountModal {...defaultProps} />);

    const input = screen.getByPlaceholderText("delete my account");
    fireEvent.change(input, { target: { value: "delete my" } });

    await waitFor(() => {
      expect(
        screen.getByText(/Text does not match/)
      ).toBeInTheDocument();
    });
  });

  it("shows success message when text matches exactly", async () => {
    render(<DeleteAccountModal {...defaultProps} />);

    const input = screen.getByPlaceholderText("delete my account");
    fireEvent.change(input, { target: { value: "delete my account" } });

    await waitFor(() => {
      expect(screen.getByText("✓ Ready to delete")).toBeInTheDocument();
    });
  });

  it("calls deleteAccount when delete button is clicked with correct text", async () => {
    render(<DeleteAccountModal {...defaultProps} />);

    const input = screen.getByPlaceholderText("delete my account");
    fireEvent.change(input, { target: { value: "delete my account" } });

    const deleteButton = screen.getByText("Delete Account Permanently");
    await waitFor(() => {
      expect(deleteButton).not.toBeDisabled();
    });

    fireEvent.click(deleteButton);

    expect(mockDeleteAccount).toHaveBeenCalled();
  });

  it("disables buttons and shows loading state while deleting", () => {
    mockUseDeleteAccount.mockReturnValue({
      deleteAccount: mockDeleteAccount,
      isDeleting: true,
      error: null,
    });

    render(<DeleteAccountModal {...defaultProps} />);

    expect(screen.getByLabelText("Close")).toBeDisabled();
    expect(screen.getByText("Cancel")).toBeDisabled();
    expect(screen.getByText("Deleting…")).toBeInTheDocument();
  });

  it("displays error message when deletion fails", () => {
    mockUseDeleteAccount.mockReturnValue({
      deleteAccount: mockDeleteAccount,
      isDeleting: false,
      error: "Failed to delete account",
    });

    render(<DeleteAccountModal {...defaultProps} />);

    expect(screen.getByText("Failed to delete account")).toBeInTheDocument();
  });

  it("shows warning about data deletion", () => {
    render(<DeleteAccountModal {...defaultProps} />);

    expect(
      screen.getByText(/Deleting your account will permanently erase all your data/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/All travel plans you created/)
    ).toBeInTheDocument();
    expect(screen.getByText(/All itinerary items/)).toBeInTheDocument();
  });
});
