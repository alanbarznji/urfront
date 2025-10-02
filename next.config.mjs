/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // This makes Next output static HTML in ./out
  output: "export",
  // Needed if you use next/image during export
  images: { unoptimized: true },
};

export default nextConfig;
