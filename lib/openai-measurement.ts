// First-party, tab-session storage only. Never use cookies or localStorage.
const STORAGE_KEY = '7th_creation_openai_measurement';
export const MEASUREMENT_CHANGED = '7th-creation-measurement-changed';
export type MeasurementChoice = 'unset' | 'granted' | 'denied';
export interface MeasurementState { choice: MeasurementChoice; oppref?: string }

/** Preserve opaque OpenAI references verbatim; reject unsafe/oversized input. */
export function validOppref(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0 && value.length <= 4096 &&
    !/[\u0000-\u0020\u007f]/.test(value);
}

export function privacySignalEnabled(): boolean {
  return typeof navigator !== 'undefined' &&
    (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
}

export function readMeasurement(): MeasurementState {
  if (typeof window === 'undefined') return { choice: 'unset' };
  try {
    if (privacySignalEnabled()) {
      window.sessionStorage.removeItem(STORAGE_KEY);
      return { choice: 'denied' };
    }
    const saved = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || 'null');
    if (saved?.choice === 'granted') {
      return { choice: 'granted', ...(validOppref(saved.oppref) ? { oppref: saved.oppref } : {}) };
    }
    return { choice: saved?.choice === 'denied' ? 'denied' : 'unset' };
  } catch {
    return { choice: 'unset' };
  }
}

/** Called on navigation/focus and before submission, never before consent. */
export function captureConsentedClick(): MeasurementState {
  const state = readMeasurement();
  if (state.choice !== 'granted' || typeof window === 'undefined') return state;
  const incoming = new URLSearchParams(window.location.search).get('oppref');
  if (!validOppref(incoming)) return state;
  const next: MeasurementState = { choice: 'granted', oppref: incoming };
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next;
  } catch {
    return { choice: 'unset' };
  }
}

export function chooseMeasurement(allow: boolean): MeasurementState {
  if (typeof window === 'undefined') return { choice: 'unset' };
  try {
    const previous = readMeasurement();
    const granted = allow && !privacySignalEnabled();
    // Overwrite rather than merge: rejection/withdrawal always removes oppref.
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
      choice: granted ? 'granted' : 'denied',
      ...(granted && previous.choice === 'granted' && previous.oppref ? { oppref: previous.oppref } : {}),
    }));
    const state = captureConsentedClick();
    window.dispatchEvent(new Event(MEASUREMENT_CHANGED));
    return state;
  } catch {
    return { choice: 'unset' };
  }
}

/** Only this allowlisted snapshot is sent to the quote API. */
export function quoteMeasurement() {
  const state = captureConsentedClick();
  return {
    openaiMeasurementConsent: state.choice === 'granted',
    ...(state.choice === 'granted' && state.oppref ? { openaiClickReference: state.oppref } : {}),
  };
}
