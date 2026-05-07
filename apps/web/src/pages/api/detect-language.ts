import type { NextApiRequest, NextApiResponse } from 'next';

interface LanguageResponse {
  language: 'en' | 'pt';
  detected: boolean; // true if language was detected from geolocation, false if it's just the default fallback
  countryCode?: string; // for debugging: shows what country the IP was detected as
}

interface GeoJSResponse {
  country_code?: string;
}

const COUNTRY_TO_LANGUAGE: Record<string, 'en' | 'pt'> = {
  BR: 'pt',
  PT: 'pt',
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LanguageResponse>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ language: 'en', detected: false });
    return;
  }

  let ip = (req.headers['x-forwarded-for'] as string) || req.socket?.remoteAddress || '';
  const ipAddress = typeof ip === 'string' ? ip.split(',')[0].trim() : ip;

  const { language, detected, countryCode } = await detectLanguageByIP(ipAddress);
  res.status(200).json({ language, detected, countryCode });
}

async function detectLanguageByIP(ip: string): Promise<{ language: 'en' | 'pt'; detected: boolean; countryCode?: string }> {
  if (!ip || ip === '::1' || ip === '127.0.0.1') {
    return { language: 'en', detected: false, countryCode: 'LOCAL' };
  }

  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    if (!response.ok) {
      return detectLanguageViaGeoJS(ip);
    }

    const data = (await response.json()) as any;
    const countryCode = (data.country_code || data.country || data.iso || '').toUpperCase();
    const language = COUNTRY_TO_LANGUAGE[countryCode] || 'en';
    const detected = countryCode in COUNTRY_TO_LANGUAGE;

    return { language, detected, countryCode };
  } catch {
    return detectLanguageViaGeoJS(ip);
  }
}

async function detectLanguageViaGeoJS(ip: string): Promise<{ language: 'en' | 'pt'; detected: boolean; countryCode?: string }> {
  try {
    const response = await fetch(`https://get.geojs.io/v1/ip/country.json?ip=${ip}`);
    if (!response.ok) {
      return detectLanguageViaIPInfo(ip);
    }

    const data = (await response.json()) as GeoJSResponse;
    const countryCode = (data.country_code || '').toUpperCase();
    const language = COUNTRY_TO_LANGUAGE[countryCode] || 'en';
    const detected = countryCode in COUNTRY_TO_LANGUAGE;

    return { language, detected, countryCode };
  } catch {
    return detectLanguageViaIPInfo(ip);
  }
}

async function detectLanguageViaIPInfo(ip: string): Promise<{ language: 'en' | 'pt'; detected: boolean; countryCode?: string }> {
  try {
    const response = await fetch(`https://ipinfo.io/${ip}/json`);
    if (!response.ok) {
      return { language: 'en', detected: false };
    }

    const data = (await response.json()) as any;
    const countryCode = (data.country || '').toUpperCase();
    const language = COUNTRY_TO_LANGUAGE[countryCode] || 'en';
    const detected = countryCode in COUNTRY_TO_LANGUAGE;

    return { language, detected, countryCode };
  } catch {
    return { language: 'en', detected: false };
  }
}
