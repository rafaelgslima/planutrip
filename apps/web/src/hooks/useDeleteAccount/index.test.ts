import { renderHook, waitFor, act } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useDeleteAccount } from "./index";
import { supabase } from "@/lib/supabase";
import { getSupabaseAccessToken } from "@/utils/getSupabaseAccessToken";

const mockRouterPush = vi.fn().mockResolvedValue(undefined);

vi.mock("next/router", () => ({
  useRouter: () => ({ push: mockRouterPush }),
}));

vi.mock("@/lib/supabase", () => ({
  supabase: {
    auth: {
      signOut: vi.fn(),
    },
  },
}));

vi.mock("@/utils/getSupabaseAccessToken", () => ({
  getSupabaseAccessToken: vi.fn(),
}));

global.fetch = vi.fn();

describe("useDeleteAccount", () => {
  const mockSignOut = vi.mocked(supabase.auth.signOut);
  const mockGetToken = vi.mocked(getSupabaseAccessToken);
  const mockFetch = vi.mocked(global.fetch);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("starts with isDeleting false and no error", () => {
    const { result } = renderHook(() => useDeleteAccount());
    expect(result.current.isDeleting).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("successfully deletes account, signs out, and redirects to home", async () => {
    mockGetToken.mockResolvedValue("access-token-123");
    mockFetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ success: true }),
    } as never);
    mockSignOut.mockResolvedValue({ error: null } as never);

    const { result } = renderHook(() => useDeleteAccount());

    await act(async () => {
      result.current.deleteAccount();
      await waitFor(() => {
        expect(result.current.isDeleting).toBe(false);
      });
    });

    expect(mockFetch).toHaveBeenCalledWith("/api/auth/delete-account", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer access-token-123",
      },
    });

    expect(mockSignOut).toHaveBeenCalled();
    expect(mockRouterPush).toHaveBeenCalledWith("/");
    expect(result.current.error).toBeNull();
  });

  it("sets error when API call fails", async () => {
    mockGetToken.mockResolvedValue("access-token-123");
    mockFetch.mockResolvedValue({
      ok: false,
      json: vi.fn().mockResolvedValue({ message: "Server error" }),
    } as never);

    const { result } = renderHook(() => useDeleteAccount());

    await act(async () => {
      result.current.deleteAccount();
      await waitFor(() => {
        expect(result.current.isDeleting).toBe(false);
      });
    });

    expect(result.current.error).toBe("Server error");
    expect(mockSignOut).not.toHaveBeenCalled();
    expect(mockRouterPush).not.toHaveBeenCalled();
  });

  it("sets error when API call throws", async () => {
    mockGetToken.mockResolvedValue("access-token-123");
    mockFetch.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useDeleteAccount());

    await act(async () => {
      result.current.deleteAccount();
      await waitFor(() => {
        expect(result.current.isDeleting).toBe(false);
      });
    });

    expect(result.current.error).toBe("Network error");
    expect(mockSignOut).not.toHaveBeenCalled();
    expect(mockRouterPush).not.toHaveBeenCalled();
  });
});
