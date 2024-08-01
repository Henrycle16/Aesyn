/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.pexels.com', 'www.youtube.com', 's3-web-storage.s3.us-east-2.amazonaws.com'],
  },
  async redirects() {
    return [
      {
        source: '/settings',
        destination: '/settings/account',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;