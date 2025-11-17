/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  env: {
    GROQ_API_KEY: process.env.GROQ_API_KEY, // make it available at runtime
  },
};

export default nextConfig;
