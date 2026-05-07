import { useTranslation } from "react-i18next";

export function AuthDivider() {
  const { t } = useTranslation('auth');

  return (
    <div className="flex items-center gap-4 py-3">
      <div className="flex-1 h-[1px] bg-gradient-to-r from-white/[0.05] to-white/[0.02]" />
      <span className="text-xs font-medium text-tf-muted px-2">{t('login.orContinueWith')}</span>
      <div className="flex-1 h-[1px] bg-gradient-to-l from-white/[0.05] to-white/[0.02]" />
    </div>
  );
}
