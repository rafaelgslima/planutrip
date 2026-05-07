import { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MdAdd } from "react-icons/md";
import { useTravelPlans } from "@/hooks/useTravelPlans";
import { LoadingSpinner } from "@/components/Loading/LoadingSpinner";
import { CreateTravelPlanModal } from "./CreateTravelPlanModal";
import { TravelPlansList } from "./TravelPlansList";
import type { TravelPlansProps } from "./types";

export function TravelPlans({ statusFilter }: TravelPlansProps = {}) {
  const { t } = useTranslation('travel-plans');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    travelPlans,
    isLoading,
    loadError,
    loadTravelPlans,
    createPlan,
    createError,
    deletePlan,
  } = useTravelPlans(statusFilter);

  useEffect(() => {
    void loadTravelPlans();
  }, [loadTravelPlans]);

  const handleCreatePlan = useCallback(
    async (destination: string, startDate: Date, endDate: Date) => {
      await createPlan(destination, startDate, endDate);
      setIsModalOpen(false);
    },
    [createPlan],
  );

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h2
            className="font-outfit font-normal tracking-[-0.01em] text-tf-text leading-[1.1] mb-1.5 text-[30px]"
          >
            {t('plans.myTrips')}
          </h2>
          <p className="text-sm text-tf-muted font-outfit">
            {t('dashboard.subtitle')}
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 py-[11px] px-[22px] bg-tf-amber text-[#0E0B09] border-none rounded-[10px] text-sm font-semibold font-outfit cursor-pointer tracking-[-0.01em] shadow-[0_4px_16px_rgba(232,162,58,0.25)]"
        >
          <MdAdd size={16} aria-hidden="true" />
          {t('dashboard.createNew')}
        </button>
      </div>

      {createError && <div className="tf-alert-error">{createError}</div>}

      {isLoading && (
        <div className="flex items-center gap-3 py-8" data-testid="travel-plans-loading">
          <LoadingSpinner size="lg" className="text-amber-400" />
          <p className="text-sm text-tf-muted font-outfit">{t('dashboard.loading')}</p>
        </div>
      )}

      {!isLoading && loadError && (
        <div className="tf-alert-error" data-testid="travel-plans-load-error">{loadError}</div>
      )}

      {!isLoading && !loadError && travelPlans.length === 0 && (
        <div className="py-[64px] px-6 text-center border border-dashed border-tf-border rounded-[20px]">
          <p className="text-[15px] text-tf-muted font-outfit">
            {t('dashboard.noPlan')}
          </p>
        </div>
      )}

      {!isLoading && !loadError && travelPlans.length > 0 && (
        <TravelPlansList plans={travelPlans} onDeletePlan={deletePlan} />
      )}

      <CreateTravelPlanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleCreatePlan}
      />
    </div>
  );
}
