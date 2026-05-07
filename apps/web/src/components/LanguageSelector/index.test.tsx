import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageSelector } from './index';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      language: 'en',
      changeLanguage: vi.fn(),
    },
  }),
  I18nextProvider: ({ children }: { children: React.ReactNode }) => children,
}));

describe('LanguageSelector', () => {
  it('renders with EN and PT options', () => {
    render(<LanguageSelector />);

    const enOption = screen.getByRole('option', { name: 'EN' });
    const ptOption = screen.getByRole('option', { name: 'PT' });

    expect(enOption).toBeInTheDocument();
    expect(ptOption).toBeInTheDocument();
  });

  it('has the correct initial value', () => {
    render(<LanguageSelector />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('en');
  });

  it('has an accessible label', () => {
    render(<LanguageSelector />);

    const select = screen.getByLabelText('Select language');
    expect(select).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    const { container } = render(<LanguageSelector className={customClass} />);

    const select = container.querySelector('select');
    expect(select).toHaveClass(customClass);
  });
});
