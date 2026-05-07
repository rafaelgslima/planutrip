import { renderHook, act } from "@testing-library/react";
import { useRouter } from "next/router";
import { vi } from "vitest";
import { useGoogleAuth } from ".";

vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));

vi.mock("@/lib/supabase", () => ({
  supabase: {
    auth: {
      signInWithOAuth: vi.fn(),
    },
  },
}));

describe("useGoogleAuth", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue({
      query: {},
      push: vi.fn(),
    });
  });

  it("initializes with default state", () => {
    const { result } = renderHook(() => useGoogleAuth());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it("calls signInWithOAuth on handleGoogleSignIn", async () => {
    const { supabase } = await import("@/lib/supabase");
    (supabase.auth.signInWithOAuth as any).mockResolvedValue({ error: null });

    const { result } = renderHook(() => useGoogleAuth());

    await act(async () => {
      await result.current.handleGoogleSignIn();
    });

    expect(supabase.auth.signInWithOAuth).toHaveBeenCalledWith({
      provider: "google",
      options: expect.objectContaining({
        redirectTo: expect.stringContaining("/auth/callback"),
      }),
    });
  });

  it("sets error on OAuth failure", async () => {
    const { supabase } = await import("@/lib/supabase");
    const errorMessage = "OAuth error";
    (supabase.auth.signInWithOAuth as any).mockResolvedValue({
      error: { message: errorMessage },
    });

    const { result } = renderHook(() => useGoogleAuth());

    await act(async () => {
      await result.current.handleGoogleSignIn();
    });

    expect(result.current.error).toBe(errorMessage);
  });

  it("includes next URL in redirect if provided", async () => {
    const { supabase } = await import("@/lib/supabase");
    (supabase.auth.signInWithOAuth as any).mockResolvedValue({ error: null });
    (useRouter as any).mockReturnValue({
      query: { next: "/home" },
      push: vi.fn(),
    });

    const { result } = renderHook(() => useGoogleAuth());

    await act(async () => {
      await result.current.handleGoogleSignIn();
    });

    expect(supabase.auth.signInWithOAuth).toHaveBeenCalledWith({
      provider: "google",
      options: expect.objectContaining({
        redirectTo: expect.stringContaining("next=%2Fhome"),
      }),
    });
  });
});
