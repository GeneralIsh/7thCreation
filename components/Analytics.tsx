'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { captureFirstTouchAttribution } from '@/lib/attribution';

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function Analytics() {
  useEffect(() => {
    captureFirstTouchAttribution();
  }, []);

  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-config" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${measurementId}');`}
      </Script>
    </>
  );
}
