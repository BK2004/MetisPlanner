/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/planner",
                destination: "/planner/monthly",
                permanent: false,
            },
        ]
    },
    env: {
        
    }
}

module.exports = nextConfig;
