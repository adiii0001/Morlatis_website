import { redirect } from "next/navigation";

/**
 * The Foundation has had three addresses over the life of this site: one under
 * /about, one under /business-verticals, and now /csr — which is the correct
 * one, because it is a charitable trust and not a trading vertical.
 *
 * Both older paths redirect here so nothing linked or indexed breaks.
 */
export default function AboutVasudhaaraFoundation() {
  redirect("/csr");
}
