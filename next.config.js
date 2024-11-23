const checkEnvVariables = require("./check-env-variables")

checkEnvVariables()
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      "@medusajs/pricing",
    ],
  },
  rewrites: async() => {
    return [
      {
        source: '/ir/admin/:path*',
        destination: 'http://localhost:9000/:path*'
      }
    ]
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
        protocol: "https",
        hostname: "tabeshelecshop-api.liara.run",
      },
      {
        protocol: "https",
        hostname: "tabeshelecshop.ir",
      },
      {
        protocol: "https",
        hostname: "tbsbucket.storage.c2.liara.space"
      }
    ],
  },
}

module.exports = nextConfig
