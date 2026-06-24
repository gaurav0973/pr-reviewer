import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    "pr-reviewer-ochre.vercel.app",
    "upload-purging-exile.ngrok-free.dev",
  ],
};

export default nextConfig;
