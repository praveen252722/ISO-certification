import type { NextConfig } from 'next'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = dirname(fileURLToPath(import.meta.url))

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'res.cloudinary.com' }]
  },
  env: { NEXT_PUBLIC_API_URL: 'http://localhost:5000/api/v1' },
  turbopack: { root: resolve(projectRoot, '..') }
}

export default nextConfig
