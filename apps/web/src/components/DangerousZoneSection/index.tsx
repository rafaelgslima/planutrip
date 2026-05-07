import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MdWarning } from "react-icons/md";
import { DeleteAccountModal } from "@/components/DeleteAccountModal";
import type { DangerousZoneSectionProps } from "./types";

export function DangerousZoneSection({ onDeleteClick }: DangerousZoneSectionProps) {
  const { t } = useTranslation('profile');
  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = () => {
    setShowModal(true);
    onDeleteClick?.();
  };

  return (
    <>
      {/* Dangerous Zone Section */}
      <div className="border-t border-red-500/30 pt-7 mt-7">
        {/* Header with warning icon */}
        <div className="flex items-center gap-3 mb-4">
          <MdWarning className="w-5 h-5 text-red-400" />
          <h3 className="text-[11px] font-bold tracking-[0.1em] uppercase text-red-400 font-outfit">
            {t('dangerZone.title')}
          </h3>
        </div>

        {/* Warning description */}
        <p className="text-xs text-tf-muted font-outfit leading-relaxed mb-6">
          {t('dangerZone.description')}
        </p>

        {/* Delete button */}
        <button
          onClick={handleDeleteClick}
          className="px-4 py-2.5 bg-red-500/90 hover:bg-red-500 text-white text-xs font-semibold rounded-lg transition-colors duration-200 font-outfit"
        >
          {t('dangerZone.deleteButton')}
        </button>
      </div>

      {/* Delete Account Modal */}
      <DeleteAccountModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
