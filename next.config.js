/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['image.tmdb.org', 'envs.sh']
  },
  assetPrefix: '',
  basePath: '',
  distDir: 'out'
}

module.exports = nextConfig
