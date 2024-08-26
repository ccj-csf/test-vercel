import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';
import withBundleAnalyzerImport from '@next/bundle-analyzer';
import createNextIntlPlugin from 'next-intl/plugin';

const withBundleAnalyzer = withBundleAnalyzerImport({
  enabled: process.env.ANALYZE === 'true',
});

if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ];
  },
  transpilePackages: ['antd-mobile'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        port: '',
        pathname: '/**',
      },
    ],
  },
  reactStrictMode: false,
  experimental: {
    serverComponentsExternalPackages: ['grammy'],
  },
};

// 将 withNextIntl 和 withBundleAnalyzer 链式调用
export default withNextIntl(nextConfig);
