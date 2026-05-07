import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdShare } from "react-icons/md";
import { createTravelPlanShareInvite } from "@/lib/api/travelPlans";
import { getSupabaseAccessToken } from "@/utils/getSupabaseAccessToken";
import { validateEmail } from "@/utils/validation";
import { ShareTravelPlanModal } from "../ShareTravelPlanModal";
import type { ShareTravelPlanButtonProps } from "./types";

type ShareResult = "idle" | "success" | "error";

export function ShareTravelPlanButton({
  travelPlanId,
  onShareCreated,
}: ShareTravelPlanButtonProps) {
  const { t } = useTranslation('travel-plans');
  const [isOpen, setIsOpen] = useState(false);
  const [friendEmail, setFriendEmail] = useState("");
  const [friendEmailError, setFriendEmailError] = useState<string | null>(null);
  const [result, setResult] = useState<ShareResult>("idle");
  const [isSending, setIsSending] = useState(false);

  const message = useMemo(() => {
    if (result === "success")
      return {
        type: "success" as const,
        text: t('sharing.inviteSentSuccess'),
      };
    if (result === "error")
      return {
        type: "error" as const,
        text: t('sharing.errorSendingInvite'),
      };
    return null;
  }, [result, t]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setFriendEmail("");
    setFriendEmailError(null);
    setResult("idle");
  }, []);

  const handleConfirm = useCallback(async () => {
    setResult("idle");

    const emailError = validateEmail(friendEmail);
    if (emailError) {
      setFriendEmailError(emailError);
      return;
    }

    setIsSending(true);
    try {
      const accessToken = await getSupabaseAccessToken();
      if (!accessToken) {
        setResult("error");
        return;
      }

      await createTravelPlanShareInvite(
        travelPlanId,
        { invited_email: friendEmail },
        accessToken,
      );
      setResult("success");
      if (onShareCreated) onShareCreated();
    } catch (error) {
      setResult("error");
    } finally {
      setIsSending(false);
    }
  }, [friendEmail, travelPlanId, onShareCreated]);

  const isConfirmDisabled = result === "success" || isSending;

  const handleFriendEmailChange = useCallback(
    (email: string) => {
      setFriendEmail(email);
      if (friendEmailError) {
        setFriendEmailError(null);
      }
    },
    [friendEmailError],
  );

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center gap-1.5 py-2 px-3.5 bg-tf-amber-soft border border-tf-border-amber rounded-[9px] text-[13px] font-semibold text-tf-amber font-outfit cursor-pointer transition-colors duration-150"
        aria-label={t('sharing.share')}
        onClick={handleOpen}
      >
        <MdShare size={14} aria-hidden="true" />
        <span>{t('sharing.share')}</span>
      </button>

      <ShareTravelPlanModal
        isOpen={isOpen}
        friendEmail={friendEmail}
        friendEmailError={friendEmailError}
        message={message}
        isConfirmDisabled={isConfirmDisabled}
        isSending={isSending}
        onClose={handleClose}
        onConfirm={handleConfirm}
        onFriendEmailChange={handleFriendEmailChange}
      />
    </>
  );
}
