// const checkEnvVariables = require("./check-env-variables")
import { withPayload } from "@payloadcms/next/withPayload"
import redirects from "./redirects.js"

// checkEnvVariables()
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/ir/admin/:path*",
        destination: "http://localhost:9000/:path*",
      },
    ]
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  staticPageGenerationTimeout: 1000,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: '8000'
      },
      {
        protocol: "https",
        hostname: "tabeshelecshop-api.liara.run",
      },
      {
        protocol: "https",
        hostname: "tabeshelecshop.ir",
      },
      {
        protocol: "https",
        hostname: "tbsbucket.storage.c2.liara.space",
      },
      {
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })

    return config
  },
  redirects,
}

export default withPayload(nextConfig)
