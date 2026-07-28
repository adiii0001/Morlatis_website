import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * Generated OG card.
 *
 * The previous metadata pointed at /og-image.jpg, which did not exist — every
 * LinkedIn and WhatsApp share rendered a broken preview.
 */
export const alt = "Morlatis Group — Electrical EPC, SCADA & Automation Engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Satori has no filesystem and no request context, so the mark is inlined as a
   data URI at module load rather than fetched. */
const mark = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public", "morlatis-logo-white.png"),
).toString("base64")}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #050d19 0%, #0b1728 55%, #13233b 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Mark. The wordmark is inside the artwork, so no type lockup here. */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mark} width={216} height={80} alt="" />
          <div style={{ color: "#35d468", fontSize: 13, letterSpacing: 4, fontWeight: 600 }}>
            INNOVATION UNFURL
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: -3,
              maxWidth: 900,
            }}
          >
            Powering India&apos;s
          </div>
          <div
            style={{
              color: "#35d468",
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: -3,
            }}
          >
            infrastructure
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 28,
            borderTop: "1px solid rgba(255,255,255,0.14)",
            paddingTop: 26,
            color: "#9ab0cd",
            fontSize: 21,
          }}
        >
          <span>Electrical EPC</span>
          <span style={{ color: "#3f5f8b" }}>·</span>
          <span>RTU · SCADA</span>
          <span style={{ color: "#3f5f8b" }}>·</span>
          <span>Relay Retrofitting</span>
          <span style={{ color: "#3f5f8b" }}>·</span>
          <span>Railway Electrical</span>
        </div>
      </div>
    ),
    size
  );
}
