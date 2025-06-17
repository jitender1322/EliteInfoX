import { articlesAPI, categoriesAPI } from "../services/api";

export const generateSitemapData = async () => {
  try {
    // Fetch all articles and categories
    const [articles, categories] = await Promise.all([
      articlesAPI.getAll(),
      categoriesAPI.getAll(),
    ]);

    // Base URL
    const baseUrl = "https://eliteinfox.com";

    // Static routes
    const staticRoutes = [
      { url: "/", priority: 1.0, changefreq: "daily" },
      { url: "/articles", priority: 0.9, changefreq: "daily" },
      { url: "/categories", priority: 0.8, changefreq: "weekly" },
    ];

    // Article routes
    const articleRoutes = articles.map((article) => ({
      url: `/article/${article.id}`,
      priority: 0.8,
      changefreq: "weekly",
      lastmod: article.updated_at || article.created_at,
    }));

    // Category routes
    const categoryRoutes = categories.map((category) => ({
      url: `/category/${category.id}`,
      priority: 0.7,
      changefreq: "weekly",
    }));

    // Combine all routes
    const routes = [...staticRoutes, ...articleRoutes, ...categoryRoutes];

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map(
      (route) => `
  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${route.lastmod || new Date().toISOString()}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    )
    .join("")}
</urlset>`;

    return sitemap;
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return null;
  }
};
