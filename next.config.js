/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}
module.exports = {
  webpack: (config, { isServer }) => {
      // 空のオブジェクト渡すことでnpmパッケージがfsモジュールに依存しないようにします
      if (!isServer) {
          config.node = {
              fs: 'empty'
          }
      }
      return config
  }
}

module.exports = nextConfig
