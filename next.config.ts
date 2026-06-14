import type { NextConfig } from "next";

const repo = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.GITHUB_REPOSITORY ? `/${repo}` : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
