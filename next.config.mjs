/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow dev access from LAN IP when using network URL for testing on mobile
  allowedDevOrigins: [
    "http://192.168.100.192:3001",
    "http://192.168.100.192:3000",
    "192.168.100.192",
    "http://localhost:3001",
    "http://localhost:3000",
  ],
};

export default nextConfig;
