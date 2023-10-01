/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: process.env.AEM_HOSTNAME,
                port: '',
            }
        ]
    }
}

module.exports = nextConfig
