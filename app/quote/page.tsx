'use client';

import { useState } from 'react';

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

interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  services: string[];
  timeline: string;
  details: string;
}

const EMPTY: FormState = {
  name: '', company: '', email: '', phone: '',
  services: [], timeline: '', details: '',
};

export default function QuotePage() {
  const [form, setForm] = useState<FormState>(EMPTY);

  const set = (field: keyof FormState, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const toggleService = (s: string) =>
    setForm((f) => ({
      ...f,
      services: f.services.includes(s)
        ? f.services.filter((x) => x !== s)
        : [...f.services, s],
    }));

  const buildMailto = () => {
    const subject = encodeURIComponent('Quote Request — 7th Creation Studio');
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Company: ${form.company || '—'}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone || '—'}`,
        `Services: ${form.services.join(', ') || '—'}`,
        `Timeline: ${form.timeline || '—'}`,
        '',
        'Project Details:',
        form.details,
      ].join('\n')
    );
    return `mailto:studio@7thcreation.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = buildMailto();
  };

  const inputClass =
    'w-full bg-dark border border-charcoal text-cream placeholder-gray text-sm px-4 py-3 focus:outline-none focus:border-blue transition-colors';

  return (
    <div className="min-h-screen">

      {/* ── Page header (dark, consistent) ── */}
      <section className="bg-dark pt-24 pb-10 lg:pt-40 lg:pb-20">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <p className="section-eyebrow-light">Get a Quote</p>
          <h1 className="font-heading font-extrabold text-cream text-5xl lg:text-6xl tracking-tighter mb-4">
            Have a project<br />coming up?
          </h1>
          <p className="text-coolgray text-lg max-w-lg leading-relaxed">
            Fill in the form below and we'll get back to you with pricing and next steps.
          </p>
        </div>
      </section>

      {/* ── Form area ── */}
      <section className="bg-cream py-10 lg:py-24">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-start">

            {/* Left: contact info */}
            <div className="lg:col-span-2 lg:sticky lg:top-24">
              <p className="text-dark font-heading font-extrabold text-xl tracking-tight mb-6">
                Send us your project details and we'll respond with a quote.
              </p>
              <p className="text-gray text-sm leading-relaxed mb-8">
                Include size, quantity, substrate preferences, install requirements, and any deadline. The more detail, the faster we can turn around a quote.
              </p>
              <p className="text-gray text-sm leading-relaxed mb-8">
                Pressing <strong className="text-dark">Send Request</strong> opens your email client with the details pre-filled.
              </p>
              <address className="flex flex-col gap-3 text-sm">
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
            </div>

            {/* Right: form */}
            <div className="lg:col-span-3 bg-dark p-5 lg:p-10">
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
                    Services Needed
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

                <div className="mb-6">
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

                <button
                  type="submit"
                  className="w-full py-4 bg-blue text-cream font-bold text-sm uppercase tracking-widest hover:bg-lightblue hover:text-dark transition-colors focus-ring"
                >
                  Send Request
                </button>

                <p className="text-xs text-gray text-center mt-4">
                  Opens your email client with the details pre-filled.
                </p>

              </form>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
