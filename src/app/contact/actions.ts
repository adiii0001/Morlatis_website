"use server";

import { company } from "@/content/company";
import type { EnquiryState } from "./enquiry-state";

const SUBJECTS: Record<string, string> = {
  epc: "Electrical EPC",
  automation: "RTU / SCADA / Automation",
  relay: "Relay Retrofitting",
  railway: "Railway Electrical",
  supply: "Strategic Sourcing",
  equifin: "Morlatis Equifin — wealth management",
  csr: "Vasudhaara Foundation",
  other: "General enquiry",
};

/**
 * Enquiry handler.
 *
 * The previous contact form had no transport at all — it called
 * `setSubmitted(true)` and told the visitor "We have received your message and
 * will get back to you within 24 hours." Nothing was sent anywhere.
 *
 * This validates server-side and forwards to CONTACT_WEBHOOK_URL when one is
 * configured. When it is not, it says so plainly and hands back a prefilled
 * mailto so the enquiry still reaches the company instead of vanishing.
 */
export async function submitEnquiry(
  _prev: EnquiryState,
  formData: FormData
): Promise<EnquiryState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const subject = String(formData.get("subject") ?? "other");
  const message = String(formData.get("message") ?? "").trim();
  const honeypot = String(formData.get("company_website") ?? "");

  // Bot trap: a hidden field a human never fills.
  if (honeypot) {
    return { status: "success", message: "Thank you — your enquiry has been sent.", fieldErrors: {} };
  }

  const fieldErrors: Record<string, string> = {};
  if (name.length < 2) fieldErrors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    fieldErrors.email = "Please enter a valid email address.";
  if (phone && !/^[\d+\-()\s]{6,20}$/.test(phone))
    fieldErrors.phone = "Please enter a valid phone number.";
  if (message.length < 20)
    fieldErrors.message = "Please describe the requirement in at least 20 characters.";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      fieldErrors,
    };
  }

  const subjectLabel = SUBJECTS[subject] ?? SUBJECTS.other;
  const endpoint = process.env.CONTACT_WEBHOOK_URL;

  if (endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, subject: subjectLabel, message }),
      });
      if (!response.ok) throw new Error(`Transport responded ${response.status}`);

      return {
        status: "success",
        message: "Thank you — your enquiry has been sent. We respond within one working day.",
        fieldErrors: {},
      };
    } catch (error) {
      console.error("Enquiry transport failed:", error);
      return {
        status: "error",
        message: `We could not send that automatically. Please email ${company.projectsEmail} directly.`,
        fieldErrors: {},
      };
    }
  }

  const mailto =
    `mailto:${company.projectsEmail}` +
    `?subject=${encodeURIComponent(`[${subjectLabel}] Enquiry from ${name}`)}` +
    `&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "—"}\nSubject: ${subjectLabel}\n\n${message}`
    )}`;

  return {
    status: "unconfigured",
    message:
      "Your details are ready to send. Email delivery is not yet connected on this site, so the button below will open your mail client with everything filled in.",
    fieldErrors: {},
    mailto,
  };
}
