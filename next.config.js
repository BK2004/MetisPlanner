/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/planner",
                destination: "/planner/daily",
                permanent: true,
            },
            {
                source: "/verify",
                destination: "/",
                permanent: true,
            }
        ]
    },
    env: {
        
    }
}

module.exports = nextConfig;
