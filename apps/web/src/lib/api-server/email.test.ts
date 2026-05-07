// @vitest-environment node
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { sendTravelPlanInvite } from "./email";

const ACCEPT_URL = "http://localhost:3000/share/accept?token=abc123";

const mockEmailsSend = vi.fn();

vi.mock("resend", () => {
  const mockResend = vi.fn(function (this: any) {
    this.emails = {
      send: mockEmailsSend,
    };
  });
  return { Resend: mockResend };
});

beforeEach(() => {
  mockEmailsSend.mockResolvedValue({ id: "email-id" });
  process.env.RESEND_API_KEY = "test-resend-key";
  process.env.APP_BASE_URL = "http://localhost:3000";
});

afterEach(() => {
  vi.clearAllMocks();
  delete process.env.RESEND_API_KEY;
});

describe("sendTravelPlanInvite", () => {
  it("sends a Resend email with the correct payload", async () => {
    await sendTravelPlanInvite({
      toEmail: "friend@example.com",
      invitedByEmail: "owner@example.com",
      acceptUrl: ACCEPT_URL,
    });

    expect(mockEmailsSend).toHaveBeenCalledOnce();
    const callArgs = mockEmailsSend.mock.calls[0][0];
    expect(callArgs.to).toBe("friend@example.com");
    expect(callArgs.subject).toContain("owner@example.com");
    expect(callArgs.text).toBeDefined();
    expect(callArgs.html).toBeDefined();
  });

  it("uses 'Someone' as the sender name when invitedByEmail is null", async () => {
    await sendTravelPlanInvite({
      toEmail: "friend@example.com",
      invitedByEmail: null,
      acceptUrl: ACCEPT_URL,
    });

    const callArgs = mockEmailsSend.mock.calls[0][0];
    expect(callArgs.subject).toContain("Someone");
  });

  it("skips sending and logs when RESEND_API_KEY is not set", async () => {
    delete process.env.RESEND_API_KEY;
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});

    await sendTravelPlanInvite({
      toEmail: "friend@example.com",
      invitedByEmail: null,
      acceptUrl: ACCEPT_URL,
    });

    expect(mockEmailsSend).not.toHaveBeenCalled();
    expect(infoSpy).toHaveBeenCalledWith(expect.stringContaining("not configured"));
    infoSpy.mockRestore();
  });

  it("throws when Resend returns an error", async () => {
    mockEmailsSend.mockRejectedValue(new Error("Resend 401"));

    await expect(
      sendTravelPlanInvite({
        toEmail: "friend@example.com",
        invitedByEmail: null,
        acceptUrl: ACCEPT_URL,
      }),
    ).rejects.toThrow("Resend 401");
  });
});
