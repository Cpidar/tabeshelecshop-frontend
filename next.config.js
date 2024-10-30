const { withStoreConfig } = require("./store-config")
const store = require("./store.config.json")

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = withStoreConfig({
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
  features: store.features,
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
})

console.log("next.config.js", JSON.stringify(module.exports, null, 2))

module.exports = nextConfig
