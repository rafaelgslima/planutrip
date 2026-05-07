import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useForgotPasswordForm } from "@/hooks/useForgotPasswordForm";
import { LoadingSpinner } from "@/components/Loading/LoadingSpinner";
import type { ForgotPasswordFormProps } from "./types";

export function ForgotPasswordForm({ initialEmail }: ForgotPasswordFormProps) {
  const { t } = useTranslation('auth');
  const {
    values,
    errors,
    touched,
    isSubmitting,
    isSuccess,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForgotPasswordForm(initialEmail);

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      {isSuccess && (
        <div className="tf-alert-success" role="alert">
          {t('forgotPassword.linkSent')}
        </div>
      )}
      {errors.general && (
        <div className="tf-alert-error" role="alert">{errors.general}</div>
      )}

      <p className="text-[13px] text-tf-muted font-outfit leading-relaxed text-center">
        {t('forgotPassword.description')}
      </p>

      <div>
        <label htmlFor="email" className="tf-label">{t('forgotPassword.emailLabel')}</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting || isSuccess}
          className={`tf-input${touched.email && errors.email ? " tf-input--error" : ""}`}
          placeholder={t('forgotPassword.emailPlaceholder')}
        />
        {touched.email && errors.email && (
          <p className="text-xs text-red-300 font-outfit mt-1" role="alert">{errors.email}</p>
        )}
      </div>

      <button type="submit" disabled={isSubmitting || isSuccess} className="tf-btn-primary">
        {isSubmitting ? (
          <>
            <LoadingSpinner size="sm" className="text-stone-900" />
            {t('forgotPassword.sendingLink')}
          </>
        ) : isSuccess ? t('forgotPassword.linkSent') : t('forgotPassword.sendLink')}
      </button>

      <p className="text-center">
        <Link href="/login" className="text-[13px] text-tf-amber no-underline font-outfit">
          {t('forgotPassword.backToLogin')}
        </Link>
      </p>
    </form>
  );
}
