import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdDelete } from "react-icons/md";
import { DeleteTravelPlanModal } from "../DeleteTravelPlanModal";
import type { DeleteTravelPlanButtonProps } from "./types";

export function DeleteTravelPlanButton({
  travelPlanId,
  onDelete,
}: DeleteTravelPlanButtonProps) {
  const { t } = useTranslation('travel-plans');
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleConfirm = useCallback(async () => {
    await onDelete(travelPlanId);
    setIsOpen(false);
  }, [onDelete, travelPlanId]);

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center justify-center p-2 bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.2)] rounded-[9px] text-red-300 cursor-pointer transition-colors duration-150"
        aria-label={t('deleteModal.title')}
        onClick={handleOpen}
      >
        <MdDelete size={16} aria-hidden="true" />
      </button>

      <DeleteTravelPlanModal
        isOpen={isOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </>
  );
}
