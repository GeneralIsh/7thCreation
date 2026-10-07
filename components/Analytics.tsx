'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { captureFirstTouchAttribution } from '@/lib/attribution';

const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const tagId = googleAnalyticsId || googleAdsId;

export default function Analytics() {
  useEffect(() => {
    captureFirstTouchAttribution();
  }, []);

  if (!tagId) return null;

  const tagConfigs = [googleAnalyticsId, googleAdsId]
    .filter((id): id is string => Boolean(id))
    .map((id) => `gtag('config', '${id}');`)
    .join('\n');

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${tagId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-config" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
${tagConfigs}`}
      </Script>
    </>
  );
}
