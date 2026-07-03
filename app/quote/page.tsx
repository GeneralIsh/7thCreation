'use client';

import { useState } from 'react';
import FadeIn from '@/components/FadeIn';

const SERVICE_OPTIONS = [
  'Exhibition / Event Graphics',
  'Environmental Graphics',
  'Large-Format Print Production',
  'Retail / Storefront Graphics',
  'Vehicle / Fleet Graphics',
  'Apparel / DTF / Custom Print',
  'Installation / Site Services',
  'Other / Not Sure',
];

const TIMELINE_OPTIONS = [
  'ASAP / Rush',
  '1–2 weeks',
  '2–4 weeks',
  '1–2 months',
  'Planning ahead (2+ months)',
];

const BUDGET_OPTIONS = [
  'Under $500',
  '$500 – $1,500',
  '$1,500 – $5,000',
  '$5,000 – $15,000',
  '$15,000+',
  'Not sure yet',
];

interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  services: string[];
  timeline: string;
  budget: string;
  details: string;
}

const EMPTY: FormState = {
  name: '', company: '', email: '', phone: '',
  services: [], timeline: '', budget: '', details: '',
};

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function QuotePage() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');

  const set = (field: keyof FormState, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const toggleService = (s: string) =>
    setForm((f) => ({
      ...f,
      services: f.services.includes(s)
        ? f.services.filter((x) => x !== s)
        : [...f.services, s],
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;

    if (form.services.length === 0) {
      setStatus('error');
      setErrorMsg('Please choose at least one service.');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          phone: form.phone,
          service: form.services.length > 0 ? form.services.join(', ') : 'Not specified',
          timeline: form.timeline,
          budget: form.budget,
          details: form.details,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setSubmittedEmail(form.email);
      setStatus('success');
      setForm(EMPTY);
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  const inputClass =
    'w-full bg-dark border border-charcoal text-cream placeholder-gray text-sm px-4 py-3 focus:outline-none focus:border-blue transition-colors';

  return (
    <div className="min-h-screen">

      {/* ── Page header ── */}
      <section className="bg-dark pt-28 pb-14 lg:pt-40 lg:pb-20">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <FadeIn delay={0.05}>
            <p className="section-eyebrow-light mb-4">Get a Quote</p>
          </FadeIn>
          <FadeIn delay={0.12}>
            <h1 className="font-heading font-extrabold text-cream text-4xl sm:text-5xl lg:text-6xl tracking-tighter mb-4">
              Have a project<br />coming up?
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-coolgray text-base max-w-lg leading-relaxed">
              Fill in the form and we'll get back to you with pricing and next steps — usually within 1–2 business days.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Form area ── */}
      <section className="bg-cream py-10 lg:py-24">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-start">

            {/* Left: contact info */}
            <FadeIn from="left" className="lg:col-span-2 lg:sticky lg:top-24">
              <p className="text-dark font-heading font-extrabold text-xl tracking-tight mb-6">
                Send us your project details and we'll respond with a quote.
              </p>
              <p className="text-gray text-sm leading-relaxed mb-6">
                Include size, quantity, substrate preferences, install requirements, and any deadline. The more detail, the faster we can turn around a quote.
              </p>
              <address className="flex flex-col gap-3 text-sm not-italic mb-8">
                <a
                  href="mailto:studio@7thcreation.com"
                  className="text-blue font-semibold hover:text-dark transition-colors focus-ring rounded-sm"
                >
                  studio@7thcreation.com
                </a>
                <a
                  href="tel:+15107073235"
                  className="text-blue font-semibold hover:text-dark transition-colors focus-ring rounded-sm"
                >
                  (510) 707-3235
                </a>
                <p className="text-gray">95 Linden St, Oakland, CA 94607</p>
              </address>

              {/* What to expect */}
              <div className="border-t border-silver pt-6">
                <p className="text-xs font-bold text-gray uppercase tracking-widest mb-4">What to Expect</p>
                <ul className="flex flex-col gap-3">
                  {[
                    'Response within 1–2 business days',
                    'Detailed quote with line items and specs',
                    'No obligation — just a conversation',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray">
                      <span className="text-blue font-bold mt-0.5 flex-shrink-0">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Right: form */}
            <FadeIn from="right" className="lg:col-span-3">
              <div className="bg-dark p-5 lg:p-10">

                {/* Success state */}
                {status === 'success' ? (
                  <div className="py-16 text-center">
                    <div className="w-12 h-12 rounded-full bg-blue/20 border border-blue flex items-center justify-center mx-auto mb-6">
                      <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="#d6eff8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 10l4 4 8-8" />
                      </svg>
                    </div>
                    <h2 className="font-heading font-extrabold text-cream text-2xl tracking-tight mb-3">
                      Request received.
                    </h2>
                    <p className="text-coolgray text-sm leading-relaxed max-w-sm mx-auto mb-2">
                      We'll follow up at <strong className="text-cream">{submittedEmail || 'your email'}</strong> within 1–2 business days with a quote.
                    </p>
                    <p className="text-coolgray text-sm mb-8">
                      Check your inbox — a confirmation is on its way.
                    </p>
                    <button
                      onClick={() => {
                        setStatus('idle');
                        setSubmittedEmail('');
                      }}
                      className="text-xs font-bold text-coolgray uppercase tracking-widest hover:text-cream transition-colors"
                    >
                      Submit another request →
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate aria-label="Quote request form">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="q-name" className="block text-xs font-bold text-coolgray uppercase tracking-widest mb-2">
                          Name <span className="text-lightblue">*</span>
                        </label>
                        <input
                          id="q-name" type="text" required autoComplete="name"
                          placeholder="Your name" className={inputClass}
                          value={form.name} onChange={(e) => set('name', e.target.value)}
                        />
                      </div>
                      <div>
                        <label htmlFor="q-company" className="block text-xs font-bold text-coolgray uppercase tracking-widest mb-2">
                          Company
                        </label>
                        <input
                          id="q-company" type="text" autoComplete="organization"
                          placeholder="Company / brand" className={inputClass}
                          value={form.company} onChange={(e) => set('company', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label htmlFor="q-email" className="block text-xs font-bold text-coolgray uppercase tracking-widest mb-2">
                          Email <span className="text-lightblue">*</span>
                        </label>
                        <input
                          id="q-email" type="email" required autoComplete="email"
                          placeholder="you@example.com" className={inputClass}
                          value={form.email} onChange={(e) => set('email', e.target.value)}
                        />
                      </div>
                      <div>
                        <label htmlFor="q-phone" className="block text-xs font-bold text-coolgray uppercase tracking-widest mb-2">
                          Phone
                        </label>
                        <input
                          id="q-phone" type="tel" autoComplete="tel"
                          placeholder="(510) 000-0000" className={inputClass}
                          value={form.phone} onChange={(e) => set('phone', e.target.value)}
                        />
                      </div>
                    </div>

                    <fieldset className="mb-6">
                      <legend className="block text-xs font-bold text-coolgray uppercase tracking-widest mb-3">
                        Services Needed <span className="text-lightblue">*</span>
                      </legend>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {SERVICE_OPTIONS.map((s) => {
                          const checked = form.services.includes(s);
                          return (
                            <label
                              key={s}
                              className={`flex items-center gap-3 px-3 py-2.5 border cursor-pointer transition-colors text-xs font-semibold uppercase tracking-wide ${
                                checked
                                  ? 'border-blue bg-blue/20 text-lightblue'
                                  : 'border-charcoal text-gray hover:border-gray hover:text-coolgray'
                              }`}
                            >
                              <input
                                type="checkbox" className="sr-only"
                                name="services"
                                checked={checked} onChange={() => toggleService(s)}
                              />
                              <span
                                className={`flex-shrink-0 w-4 h-4 border flex items-center justify-center ${
                                  checked ? 'border-blue bg-blue' : 'border-charcoal'
                                }`}
                                aria-hidden="true"
                              >
                                {checked && (
                                  <svg viewBox="0 0 10 8" width="10" height="8" fill="none" stroke="white" strokeWidth="1.5">
                                    <path d="M1 4l2.5 3L9 1" />
                                  </svg>
                                )}
                              </span>
                              {s}
                            </label>
                          );
                        })}
                      </div>
                    </fieldset>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label htmlFor="q-timeline" className="block text-xs font-bold text-coolgray uppercase tracking-widest mb-2">
                          Timeline
                        </label>
                        <select
                          id="q-timeline"
                          className={`${inputClass} appearance-none`}
                          value={form.timeline}
                          onChange={(e) => set('timeline', e.target.value)}
                        >
                          <option value="">Select a timeline…</option>
                          {TIMELINE_OPTIONS.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="q-budget" className="block text-xs font-bold text-coolgray uppercase tracking-widest mb-2">
                          Budget Range
                        </label>
                        <select
                          id="q-budget"
                          className={`${inputClass} appearance-none`}
                          value={form.budget}
                          onChange={(e) => set('budget', e.target.value)}
                        >
                          <option value="">Select a range…</option>
                          {BUDGET_OPTIONS.map((b) => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mb-8">
                      <label htmlFor="q-details" className="block text-xs font-bold text-coolgray uppercase tracking-widest mb-2">
                        Project Details <span className="text-lightblue">*</span>
                      </label>
                      <textarea
                        id="q-details" required rows={6}
                        placeholder="Describe your project — size, quantity, materials, install location, special requirements…"
                        className={`${inputClass} resize-y`}
                        value={form.details}
                        onChange={(e) => set('details', e.target.value)}
                      />
                    </div>

                    {/* Error message */}
                    {status === 'error' && (
                      <div className="mb-6 px-4 py-3 border border-red-500/40 bg-red-500/10">
                        <p className="text-red-400 text-sm">{errorMsg}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full py-4 bg-blue text-cream font-bold text-sm uppercase tracking-widest hover:bg-lightblue hover:text-dark transition-colors focus-ring disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {status === 'loading' ? (
                        <>
                          <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                          </svg>
                          Sending…
                        </>
                      ) : 'Send Request'}
                    </button>

                    <p className="text-xs text-gray text-center mt-4">
                      We'll respond within 1–2 business days.
                    </p>

                  </form>
                )}
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

    </div>
  );
}
