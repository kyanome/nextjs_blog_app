import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["gunjodoiktzmrwzruukk.supabase.co"],
    remotePatterns: [
      { protocol: "https", hostname: "placehold.jp" },
      { protocol: "https", hostname: "images.microcms-assets.io" }, // これを追加
    ],
  },
};

export default nextConfig;
