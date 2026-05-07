import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdCheck } from 'react-icons/md';
import type { LanguageSelectorProps } from './types';

export function LanguageSelector({ className = '' }: LanguageSelectorProps) {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'pt', label: 'PT' },
  ];

  const handleSelect = (code: string) => {
    localStorage.setItem('preferredLanguage', code);
    void i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-1.5 px-3 rounded-lg bg-white/10 text-tf-text border border-tf-border text-sm font-outfit hover:bg-white/20 transition-colors flex items-center justify-between gap-1 appearance-none"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <span>{i18n.language.toUpperCase()}</span>
        <span className="text-xs leading-none shrink-0">▼</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white/10 border border-tf-border rounded-lg overflow-hidden z-50 backdrop-blur-sm">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleSelect(lang.code)}
              className="w-full px-3 py-2 text-left text-sm font-outfit text-tf-text hover:bg-white/20 transition-colors flex items-center justify-between gap-1"
            >
              <span>{lang.label}</span>
              {i18n.language === lang.code && (
                <MdCheck size={16} className="text-tf-amber shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
