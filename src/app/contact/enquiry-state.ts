/**
 * Enquiry form state.
 *
 * Kept out of actions.ts because a `"use server"` module may only export async
 * functions — exporting a plain object from it yields `undefined` at runtime.
 */
export type EnquiryState = {
  status: "idle" | "success" | "error" | "unconfigured";
  message: string;
  fieldErrors: Record<string, string>;
  /** Prefilled mailto used as the fallback path when no transport is set up. */
  mailto?: string;
};

export const initialEnquiryState: EnquiryState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};
