'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  captureConsentedClick, chooseMeasurement, MEASUREMENT_CHANGED,
  privacySignalEnabled, type MeasurementChoice,
} from '@/lib/openai-measurement';

export default function MeasurementConsent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [choice, setChoice] = useState<MeasurementChoice>('unset');
  const [open, setOpen] = useState(false);
  const [gpc, setGpc] = useState(false);

  useEffect(() => {
    const sync = () => {
      const current = captureConsentedClick();
      setChoice(current.choice);
      setGpc(privacySignalEnabled());
      if (current.choice === 'unset') setOpen(true);
    };
    sync();
    window.addEventListener(MEASUREMENT_CHANGED, sync);
    window.addEventListener('focus', sync);
    window.addEventListener('pageshow', sync);
    return () => {
      window.removeEventListener(MEASUREMENT_CHANGED, sync);
      window.removeEventListener('focus', sync);
      window.removeEventListener('pageshow', sync);
    };
  }, [pathname, searchParams]);

  const choose = (allow: boolean) => {
    setChoice(chooseMeasurement(allow).choice);
    setOpen(false);
  };

  return (
    <>
      <button
        type="button" onClick={() => setOpen(true)}
        className="fixed bottom-3 left-3 z-40 bg-dark text-cream border border-charcoal px-3 py-2 text-xs shadow-lg"
      >
        Ad measurement preferences
      </button>
      {open && (
        <section aria-label="Optional OpenAI ad measurement" className="fixed bottom-3 left-3 right-3 z-50 max-w-xl border border-coolgray bg-dark text-cream p-5 shadow-2xl">
          <h2 className="text-base font-bold mb-2">Optional ad measurement</h2>
          <p className="text-sm text-coolgray leading-relaxed mb-4">
            With your permission, we store an OpenAI ad-click reference only for this browser session
            and share it with OpenAI when your quote request succeeds, to link the request to the ad
            you clicked. We never share your contact details or project information.
            You can withdraw here at any time.
          </p>
          {gpc && <p className="text-sm text-lightblue mb-4">Your Global Privacy Control signal keeps OpenAI ad measurement off.</p>}
          <div className="flex flex-wrap gap-3">
            <button type="button" disabled={gpc} onClick={() => choose(true)} className="px-4 py-2 border border-coolgray text-sm disabled:opacity-40">
              Allow for this session
            </button>
            <button type="button" onClick={() => choose(false)} className="px-4 py-2 border border-coolgray text-sm">
              {choice === 'granted' ? 'Withdraw consent' : 'Decline'}
            </button>
            {choice !== 'unset' && <button type="button" onClick={() => setOpen(false)} className="px-3 py-2 text-sm underline">Close</button>}
          </div>
        </section>
      )}
    </>
  );
}
