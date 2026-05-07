export function getDaysArray(startDate: Date, endDate: Date): Date[] {
  const days: Date[] = [];
  const current = new Date(startDate);
  const end = new Date(endDate);

  while (current <= end) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return days;
}

export function formatDateRange(startDate: Date, endDate: Date, locale: string = "en"): string {
  const localeMap: Record<string, string> = {
    en: "en-US",
    pt: "pt-BR",
  };
  const langLocale = localeMap[locale] || "en-US";
  const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  const startStr = startDate.toLocaleDateString(langLocale, options);
  const endStr = endDate.toLocaleDateString(langLocale, options);
  const year = endDate.getFullYear();
  return `${startStr} - ${endStr}, ${year}`;
}

export function formatDayHeader(date: Date, locale: string = "en"): { weekday: string; monthDay: string } {
  const localeMap: Record<string, string> = {
    en: "en-US",
    pt: "pt-BR",
  };
  const langLocale = localeMap[locale] || "en-US";
  const weekday = date.toLocaleDateString(langLocale, { weekday: "short" });
  const monthDay = date.toLocaleDateString(langLocale, { month: "short", day: "numeric" });
  return { weekday, monthDay };
}
