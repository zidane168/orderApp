/** @type {import('next').NextConfig} */
 
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
    images: {
        domains: ['localhost'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.googleusercontent.com',
            }
        ]
    }, 
};

export default withNextIntl(nextConfig);
