import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Locale redirects preserve the incoming origin, including local preview addresses.
  skipMiddlewareUrlNormalize: true,
};

export default nextConfig;
