export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },

    sitemap: "https://perpsia.vercel.app/sitemap.xml",

    host: "https://perpsia.vercel.app",
  };
}