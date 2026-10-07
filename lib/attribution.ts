export interface Attribution {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  landingPage: string;
}

const STORAGE_KEY = '7th_creation_attribution';

function emptyAttribution(): Attribution {
  return {
    utmSource: '',
    utmMedium: '',
    utmCampaign: '',
    utmTerm: '',
    landingPage: '',
  };
}

function fromUrl(): Attribution {
  if (typeof window === 'undefined') return emptyAttribution();

  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get('utm_source') ?? '',
    utmMedium: params.get('utm_medium') ?? '',
    utmCampaign: params.get('utm_campaign') ?? '',
    utmTerm: params.get('utm_term') ?? '',
    landingPage: window.location.pathname,
  };
}

function fromSession(): Attribution {
  if (typeof window === 'undefined') return emptyAttribution();

  try {
    const value = window.sessionStorage.getItem(STORAGE_KEY);
    if (!value) return emptyAttribution();
    const parsed = JSON.parse(value) as Partial<Attribution>;
    return {
      utmSource: typeof parsed.utmSource === 'string' ? parsed.utmSource : '',
      utmMedium: typeof parsed.utmMedium === 'string' ? parsed.utmMedium : '',
      utmCampaign: typeof parsed.utmCampaign === 'string' ? parsed.utmCampaign : '',
      utmTerm: typeof parsed.utmTerm === 'string' ? parsed.utmTerm : '',
      landingPage: typeof parsed.landingPage === 'string' ? parsed.landingPage : '',
    };
  } catch {
    return emptyAttribution();
  }
}

/** Stores an incoming campaign source for the current browser session. */
export function captureFirstTouchAttribution() {
  if (typeof window === 'undefined') return;

  const incoming = fromUrl();
  const hasCampaignData = [
    incoming.utmSource,
    incoming.utmMedium,
    incoming.utmCampaign,
    incoming.utmTerm,
  ].some(Boolean);

  if (!hasCampaignData) return;

  const existing = fromSession();
  const firstTouch = {
    utmSource: existing.utmSource || incoming.utmSource,
    utmMedium: existing.utmMedium || incoming.utmMedium,
    utmCampaign: existing.utmCampaign || incoming.utmCampaign,
    utmTerm: existing.utmTerm || incoming.utmTerm,
    landingPage: existing.landingPage || incoming.landingPage,
  };

  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(firstTouch));
}

/** Returns the current campaign data, preserving first touch across internal navigation. */
export function getAttribution(): Attribution {
  const current = fromUrl();
  const stored = fromSession();

  return {
    utmSource: current.utmSource || stored.utmSource,
    utmMedium: current.utmMedium || stored.utmMedium,
    utmCampaign: current.utmCampaign || stored.utmCampaign,
    utmTerm: current.utmTerm || stored.utmTerm,
    landingPage: stored.landingPage || current.landingPage,
  };
}
