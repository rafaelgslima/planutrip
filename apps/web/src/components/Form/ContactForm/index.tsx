import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useContactForm } from '@/hooks/useContactForm';

export function ContactForm() {
  const { t } = useTranslation('auth');
  const { values, errors, touched, isSubmitting, isSuccess, handleChange, handleBlur, handleSubmit } =
    useContactForm();

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="mb-4 text-4xl">✓</div>
        <h2 className="font-outfit text-3xl font-light text-tf-text mb-2">{t('contact.messageSent')}</h2>
        <p className="text-sm text-tf-muted mb-6">
          {t('contact.messageSentDesc')}
        </p>
        <div className="inline-flex items-center justify-center px-4 py-2 rounded bg-tf-amber-soft border border-tf-border-amber">
          <span className="text-xs text-tf-amber font-outfit font-medium">
            {t('contact.checkEmail')}
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="tf-label">
          {t('contact.nameLabel')}
        </label>
        <input
          id="name"
          type="text"
          className="tf-input"
          placeholder={t('contact.namePlaceholder')}
          value={values.name}
          onChange={(e) => handleChange('name', e.target.value)}
          onBlur={() => handleBlur('name')}
          aria-invalid={touched.name && !!errors.name}
          aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
          disabled={isSubmitting}
        />
        {touched.name && errors.name && (
          <p id="name-error" role="alert" className="text-xs text-red-400 font-outfit mt-1">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="tf-label">
          {t('contact.emailLabel')}
        </label>
        <input
          id="email"
          type="email"
          className="tf-input"
          placeholder={t('contact.emailPlaceholder')}
          value={values.email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          aria-invalid={touched.email && !!errors.email}
          aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
          disabled={isSubmitting}
        />
        {touched.email && errors.email && (
          <p id="email-error" role="alert" className="text-xs text-red-400 font-outfit mt-1">
            {errors.email}
          </p>
        )}
      </div>

      {/* Subject Field */}
      <div>
        <label htmlFor="subject" className="tf-label">
          {t('contact.subjectLabel')}
        </label>
        <input
          id="subject"
          type="text"
          className="tf-input"
          placeholder={t('contact.subjectPlaceholder')}
          value={values.subject}
          onChange={(e) => handleChange('subject', e.target.value)}
          onBlur={() => handleBlur('subject')}
          aria-invalid={touched.subject && !!errors.subject}
          aria-describedby={touched.subject && errors.subject ? 'subject-error' : undefined}
          disabled={isSubmitting}
        />
        {touched.subject && errors.subject && (
          <p id="subject-error" role="alert" className="text-xs text-red-400 font-outfit mt-1">
            {errors.subject}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="tf-label">
          {t('contact.messageLabel')}
        </label>
        <textarea
          id="message"
          className="tf-input resize-none"
          placeholder={t('contact.messagePlaceholder')}
          rows={5}
          value={values.message}
          onChange={(e) => handleChange('message', e.target.value)}
          onBlur={() => handleBlur('message')}
          aria-invalid={touched.message && !!errors.message}
          aria-describedby={touched.message && errors.message ? 'message-error' : undefined}
          disabled={isSubmitting}
        />
        {touched.message && errors.message && (
          <p id="message-error" role="alert" className="text-xs text-red-400 font-outfit mt-1">
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="tf-btn-primary w-full mt-6"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? t('contact.sending') : t('contact.send')}
      </button>

      {/* Privacy Note */}
      <p className="text-xs text-tf-muted pt-2">
        By submitting this form you consent to being contacted about your inquiry. You can manage this preference in your{' '}
        <Link href="/profile" className="text-tf-amber hover:underline">
          profile
        </Link>
        .
      </p>
    </form>
  );
}
