export const SITE_URL = 'https://www.7thcreation.com';
export const SITE_NAME = '7th Creation Studio';

export const DEFAULT_DESCRIPTION =
  '7th Creation Studio designs, produces, finishes, and installs large-format graphics for exhibitions, experiential displays, branded environments, events, storefronts, vehicles, and signage. Bay Area graphics production studio, Oakland, CA.';

export const DEFAULT_OG_IMAGE = '/og-image.png';

export function absoluteUrl(path = '/') {
  return new URL(path, SITE_URL).toString();
}

