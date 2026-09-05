import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },

  // Don't advertise the framework version.
  poweredByHeader: false,

  // Ready for real photography: modern formats and sensible breakpoints.
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [400, 640, 828, 1080, 1280, 1600, 1920, 2560],
  },

  /**
   * Retired routes. All were published and linked, so they redirect
   * permanently rather than 404: the Foundation moved out of the vertical
   * index to /csr, commodity trading was withdrawn as a vertical, and the
   * Leadership and Newsroom pages were withdrawn — neither had any content of
   * its own to show, so each now points at the page that actually answers the
   * question it was standing in for.
   */
  async redirects() {
    return [
      {
        source: "/business-verticals/vasudhaara-foundation",
        destination: "/csr",
        permanent: true,
      },
      {
        source: "/business-verticals/commodity-trading",
        destination: "/business-verticals",
        permanent: true,
      },
      { source: "/team", destination: "/about/who-we-are", permanent: true },
      { source: "/media", destination: "/contact", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
