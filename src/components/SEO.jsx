import { Helmet } from "react-helmet-async";

const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  article = null,
}) => {
  const siteTitle = "EliteInfoX - Premium Information Hub";
  const defaultDescription =
    "Your gateway to premium insights and expert analysis across various domains";
  const defaultKeywords =
    "premium content, expert analysis, insights, articles, information hub";
  const defaultImage = "/images/og-image.jpg";
  const defaultUrl = "https://eliteinfox.com";

  const seoTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const seoDescription = description || defaultDescription;
  const seoKeywords = keywords || defaultKeywords;
  const seoImage = image || defaultImage;
  const seoUrl = url || defaultUrl;

  // Structured data for the website
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteTitle,
    url: defaultUrl,
    description: defaultDescription,
    potentialAction: {
      "@type": "SearchAction",
      target: `${defaultUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  // Structured data for articles
  const articleSchema = article
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.description || seoDescription,
        image: article.image || seoImage,
        datePublished: article.date,
        dateModified: article.updated_at || article.date,
        author: {
          "@type": "Organization",
          name: "EliteInfoX",
        },
        publisher: {
          "@type": "Organization",
          name: "EliteInfoX",
          logo: {
            "@type": "ImageObject",
            url: `${defaultUrl}/logo.png`,
          },
        },
      }
    : null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
      <meta name="twitter:site" content="@eliteinfox" />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="EliteInfoX" />
      <link rel="canonical" href={seoUrl} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
