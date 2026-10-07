export type AnalyticsEventParams = Record<string, string | number | boolean | undefined>;

const quoteConversionId = process.env.NEXT_PUBLIC_GOOGLE_ADS_QUOTE_CONVERSION_ID;

declare global {
  interface Window {
    gtag?: (command: 'event' | 'config', eventName: string, params?: AnalyticsEventParams) => void;
  }
}

/**
 * Sends a measurement event when GA4 is configured. No event is sent when the
 * public measurement ID has not yet been added to the deployment environment.
 */
export function trackEvent(eventName: string, params: AnalyticsEventParams = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, params);
}

/** Fires only after the quote API confirms that the studio received the request. */
export function trackQuoteRequestConversion() {
  if (!quoteConversionId) return;

  trackEvent('conversion', {
    send_to: quoteConversionId,
    value: 1.0,
    currency: 'USD',
  });
}
