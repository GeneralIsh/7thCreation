'use client';

import { useState } from 'react';

const SERVICE_OPTIONS = [
  'Exhibition / Event Graphics',
  'Environmental Graphics',
  'Wide-Format Print Production',
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
  name: '',
  company: '',
  email: '',
  phone: '',
  services: [],
  timeline: '',
  details: '',
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
    <div className="bg-cream min-h-screen pt-16">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-20 lg:py-28">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: intro */}
          <div className="lg:sticky lg:top-24">
            <p className="section-eyebrow">Get a Quote</p>
            <h1 className="font-heading font-extrabold text-dark text-5xl lg:text-6xl tracking-tighter mb-6">
              Have a project<br />coming up?
            </h1>
            <p className="text-gray text-base leading-relaxed mb-6">
              Fill in the form and we'll get back to you with a quote. Include as much detail as possible — size, quantity, substrate preferences, and install requirements.
            </p>
            <p className="text-gray text-base leading-relaxed mb-10">
              Pressing <strong className="text-dark">Send Request</strong> will open your email client with the details pre-filled.
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
          <div className="bg-dark p-8 lg:p-10">
            <form onSubmit={handleSubmit} noValidate aria-label="Quote request form">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="q-name" className="block text-xs font-bold text-coolgray uppercase tracking-widest mb-2">
                    Name <span className="text-lightblue">*</span>
                  </label>
                  <input
                    id="q-name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    className={inputClass}
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="q-company" className="block text-xs font-bold text-coolgray uppercase tracking-widest mb-2">
                    Company
                  </label>
                  <input
                    id="q-company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Company / brand"
                    className={inputClass}
                    value={form.company}
                    onChange={(e) => set('company', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="q-email" className="block text-xs font-bold text-coolgray uppercase tracking-widest mb-2">
                    Email <span className="text-lightblue">*</span>
                  </label>
                  <input
                    id="q-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={inputClass}
                    value={form.email}
                    onChange={(e) => set('email', e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="q-phone" className="block text-xs font-bold text-coolgray uppercase tracking-widest mb-2">
                    Phone
                  </label>
                  <input
                    id="q-phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="(510) 000-0000"
                    className={inputClass}
                    value={form.phone}
                    onChange={(e) => set('phone', e.target.value)}
                  />
                </div>
              </div>

              {/* Services */}
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
                          type="checkbox"
                          className="sr-only"
                          checked={checked}
                          onChange={() => toggleService(s)}
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

              {/* Timeline */}
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

              {/* Details */}
              <div className="mb-8">
                <label htmlFor="q-details" className="block text-xs font-bold text-coolgray uppercase tracking-widest mb-2">
                  Project Details <span className="text-lightblue">*</span>
                </label>
                <textarea
                  id="q-details"
                  required
                  rows={6}
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
                This opens your email client with the details pre-filled.
              </p>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
