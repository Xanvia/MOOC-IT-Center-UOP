const host = process.env.NEXT_PUBLIC_IMAGE_HOST || "127.0.0.1";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "ui-avatars.com", host],
  },
};

export default nextConfig;
