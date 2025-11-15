/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable Turbopack explicitly to avoid conflicts with legacy webpack config
  turbopack: {},
  reactCompiler: true,
};




export default nextConfig;
