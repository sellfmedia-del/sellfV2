import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        // port alanı tamamen kaldırıldı, pathname her şeye izin verecek şekilde ayarlandı
        pathname: "/**", 
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io", 
        // Pathname kısıtlaması esnetildi
        pathname: "/**", 
      },
      {
        protocol: "https",
        hostname: "cdn.sellfmedia.workers.dev", 
        pathname: "/**", 
      },
    ],
  },

async redirects() {
  return [
    {
      source: '/post/:slug',
      destination: '/blog/:slug',
      permanent: true,
    },
    { source: '/en/home', destination: '/en', permanent: true },
    { source: '/en/post/:slug', destination: '/en/blog/:slug', permanent: true },
    { source: '/en/blog/categories/:category', destination: '/en/blog', permanent: true },
    { source: '/en/seo-danismanligi', destination: '/en/services', permanent: true },
  ];
},
};

export default nextConfig;