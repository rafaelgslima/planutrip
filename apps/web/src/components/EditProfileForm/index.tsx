import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { MdEdit, MdClose } from "react-icons/md";
import { useEditProfileForm } from "@/hooks/useEditProfileForm";
import type { EditProfileFormProps } from "./types";

export function EditProfileForm({ name, email, onNameUpdated }: EditProfileFormProps) {
  const { t } = useTranslation('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const {
    values,
    errors,
    touched,
    isSubmitting,
    isSuccess,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useEditProfileForm(name);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleSubmit();
    if (success) {
      onNameUpdated?.(values.name);
      setShowSuccess(true);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="flex flex-col gap-5">
        {/* Display name section */}
        <div>
          <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-tf-muted font-outfit mb-4">
            {t('profile.nameLabel')}
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-tf-text font-outfit font-medium">
              {values.name}
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-tf-amber font-outfit hover:text-tf-amber/80 transition-colors"
              aria-label={t('profile.editProfile')}
            >
              <MdEdit className="w-4 h-4" />
              {t('profile.editProfile')}
            </button>
          </div>
        </div>

        {/* Success message */}
        {showSuccess && (
          <div className="tf-alert-success" role="alert">
            {t('profile.profileUpdated')}
          </div>
        )}

        {/* Change password section */}
        <div className="pt-5 border-t border-tf-border">
          <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-tf-muted font-outfit mb-4">
            {t('account.accountSettings')}
          </div>
          <Link
            href={`/forgot-password?email=${encodeURIComponent(email)}`}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-tf-text font-outfit bg-tf-card border border-tf-border rounded-lg hover:border-tf-amber/50 hover:bg-[rgba(215,149,84,0.04)] transition-colors"
          >
            {t('account.changePassword')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
      <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-tf-muted font-outfit mb-2">
        {t('profile.editProfile')}
      </div>

      {/* Name input */}
      <div>
        <input
          type="text"
          value={values.name}
          onChange={(e) => handleChange("name", e.target.value)}
          onBlur={() => handleBlur("name")}
          placeholder={t('profile.namePlaceholder')}
          className={`tf-input${touched.name && errors.name ? " tf-input--error" : ""}`}
          aria-invalid={touched.name && !!errors.name}
          aria-describedby={touched.name && errors.name ? "name-error" : undefined}
        />
        {touched.name && errors.name && (
          <p id="name-error" className="text-xs text-red-300 font-outfit mt-1" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      {/* Success message */}
      {isSuccess && (
        <div className="tf-alert-success" role="alert">
          {t('profile.profileUpdated')}
        </div>
      )}

      {/* General error message */}
      {errors.general && (
        <div className="tf-alert-error" role="alert">
          {errors.general}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="flex-1 tf-btn-primary text-sm"
        >
          {isSubmitting ? (
            <>
              <span className="sr-only">{t('profile.saving')}</span>
              <span aria-hidden="true">{t('profile.saving')}</span>
            </>
          ) : (
            t('profile.save')
          )}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          disabled={isSubmitting}
          className="flex items-center justify-center w-11 h-11 rounded-lg border border-tf-border text-tf-muted hover:text-tf-text hover:border-tf-border/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={t('profile.cancel')}
        >
          <MdClose className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}
