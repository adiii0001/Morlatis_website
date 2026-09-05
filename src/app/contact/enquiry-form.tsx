"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Icon } from "@/components/ui/icon";
import { submitEnquiry } from "./actions";
import { initialEnquiryState } from "./enquiry-state";

const subjects = [
  { value: "epc", label: "Electrical EPC" },
  { value: "automation", label: "RTU / SCADA / Automation" },
  { value: "relay", label: "Relay Retrofitting" },
  { value: "railway", label: "Railway Electrical" },
  { value: "supply", label: "Strategic Sourcing" },
  { value: "equiffin", label: "Morlatis Equiffin — wealth management" },
  { value: "csr", label: "Vasudhaara Foundation" },
  { value: "other", label: "Something else" },
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-signal w-full" disabled={pending} aria-busy={pending}>
      {pending ? "Sending…" : "Send enquiry"}
      {!pending && <Icon name="arrow-right" size={16} />}
    </button>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-[0.8125rem] text-[#c0392b]">
      {message}
    </p>
  );
}

export function EnquiryForm() {
  const [state, formAction] = useActionState(submitEnquiry, initialEnquiryState);
  const errors = state.fieldErrors;

  if (state.status === "success") {
    return (
      <div className="border border-line p-8 text-center">
        <Icon name="check" size={30} className="mx-auto text-signal-600" />
        <h2 className="display-3 mt-6 !text-[1.5rem]">Enquiry sent.</h2>
        <p className="mt-3 text-[0.9375rem] text-ink-600">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="border border-line p-7 sm:p-8" noValidate>
      <h2 className="display-3 !text-[1.5rem]">Send an enquiry</h2>
      <p className="mt-2 text-[0.875rem] text-ink-500">
        Fields marked <span aria-hidden="true">*</span>
        <span className="visually-hidden">asterisk</span> are required.
      </p>

      {/* Status region: announced to assistive tech on every submission. */}
      <div aria-live="polite" className="mt-5">
        {state.status === "error" && state.message && (
          <p className="border-l-2 border-[#c0392b] bg-[#fdf3f2] px-4 py-3 text-[0.875rem] text-[#8c2b20]">
            {state.message}
          </p>
        )}
        {state.status === "unconfigured" && (
          <div className="border-l-2 border-signal-500 bg-signal-100/50 px-4 py-3">
            <p className="text-[0.875rem] text-ink-700">{state.message}</p>
            {state.mailto && (
              <a href={state.mailto} className="btn btn-ink mt-3 h-11 px-5">
                Open mail client
                <Icon name="arrow-up-right" size={14} />
              </a>
            )}
          </div>
        )}
      </div>

      <div className="mt-6 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            {/* htmlFor / id association — the old form had labels bound to nothing. */}
            <label htmlFor="name" className="field-label">
              Full name <span aria-hidden="true">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className="field"
              placeholder="Your name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "err-name" : undefined}
            />
            <FieldError id="err-name" message={errors.name} />
          </div>

          <div>
            <label htmlFor="email" className="field-label">
              Email <span aria-hidden="true">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="field"
              placeholder="you@organisation.in"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "err-email" : undefined}
            />
            <FieldError id="err-email" message={errors.email} />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="phone" className="field-label">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              className="field"
              placeholder="+91"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "err-phone" : undefined}
            />
            <FieldError id="err-phone" message={errors.phone} />
          </div>

          <div>
            <label htmlFor="subject" className="field-label">
              Nature of enquiry
            </label>
            <select id="subject" name="subject" className="field" defaultValue="epc">
              {subjects.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="field-label">
            Requirement <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            className="field"
            placeholder="Scope, voltage class, location, timeline — as much detail as you have."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "err-message" : undefined}
          />
          <FieldError id="err-message" message={errors.message} />
        </div>

        {/* Honeypot — visually and programmatically hidden from humans. */}
        <div className="visually-hidden" aria-hidden="true">
          <label htmlFor="company_website">Leave this field empty</label>
          <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <SubmitButton />
      </div>
    </form>
  );
}
