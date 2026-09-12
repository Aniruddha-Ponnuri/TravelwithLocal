import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Google avatars, for profile photos pulled in via "Continue with Google".
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
