/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/planner",
                destination: "/planner/daily",
                permanent: false,
            },
        ]
    },
    env: {
        
    }
}

module.exports = nextConfig;
