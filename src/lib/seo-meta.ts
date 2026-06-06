import { SITE_URL } from "./site-config";

export const OG_IMAGE_URL = `${SITE_URL}/og-image.png`;
export const LOGO_URL = `${SITE_URL}/logo.png`;

export const SITE_TITLE =
  "TechBuilderz - Web Development, Mobile Apps & AI Integration Studio | India";

export const SITE_DESCRIPTION =
  "TechBuilderz is a Hyderabad-based digital studio building high-performance websites, mobile apps, SaaS platforms, and AI-powered products. Serving startups and enterprises across India and globally.";

export const TWITTER_SITE = "@techbuilderz";

export const IMPACT_STATS = [
  { value: "12", target: 12, label: "Projects shipped", suffix: "" },
  { value: "03", target: 3, label: "Awards won", suffix: "", pad: 2 },
  { value: "6", target: 6, label: "Industries served", suffix: "" },
  { value: "95", target: 95, label: "Client retention", suffix: "%" },
] as const;
