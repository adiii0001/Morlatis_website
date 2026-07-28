import { redirect } from "next/navigation";

/**
 * The Foundation previously had two separate pages — one under /about and one
 * under /business-verticals — both linked from the navigation and footer. Same
 * entity, duplicate content, split search authority.
 *
 * The vertical page is now canonical; this path redirects to it.
 */
export default function AboutVasudhaaraFoundation() {
  redirect("/business-verticals/vasudhaara-foundation");
}
