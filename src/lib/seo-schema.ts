import { CONTACT_EMAIL, SITE_URL } from "./site-config";
import { LOGO_URL, OG_IMAGE_URL, SITE_DESCRIPTION } from "./seo-meta";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TechBuilderz",
  alternateName: "TecH BuilderZ",
  url: SITE_URL,
  logo: LOGO_URL,
  description: SITE_DESCRIPTION,
  foundingDate: "2026",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-9398431573",
    contactType: "customer service",
    availableLanguage: ["English", "Telugu", "Hindi"],
  },
  sameAs: [
    "https://www.linkedin.com/company/tech-builderz/",
    "https://twitter.com/techbuilderz",
    "https://github.com/techbuilderz",
  ],
  email: CONTACT_EMAIL,
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TechBuilderz",
  image: OG_IMAGE_URL,
  url: SITE_URL,
  telephone: "+91-9398431573",
  email: CONTACT_EMAIL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    postalCode: "500001",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 17.385,
    longitude: 78.4867,
  },
  priceRange: "₹₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Bank Transfer, UPI",
  openingHours: "Mo-Fr 09:00-18:00",
  hasMap: "https://maps.google.com/?q=Hyderabad,Telangana,India",
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "TechBuilderz",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "TechBuilderz",
  url: SITE_URL,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Web Development",
          description:
            "Lightning-fast websites and web apps in React, Next.js and TypeScript.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Mobile App Development",
          description:
            "Native-feel iOS and Android apps built in Flutter and React Native.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SaaS Platform Development",
          description:
            "Multi-tenant dashboards, billing, auth and analytics built for scale.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Integration",
          description:
            "Embed LLMs, RAG and AI agents into your product securely and reliably.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "UI/UX Design",
          description: "Brand-led product design and motion systems.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cloud & DevOps",
          description:
            "CI/CD pipelines, AWS/GCP infrastructure and observability.",
        },
      },
    ],
  },
};

export const jsonLdScripts = [
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
  servicesSchema,
].map((schema) => ({
  type: "application/ld+json" as const,
  children: JSON.stringify(schema),
}));
