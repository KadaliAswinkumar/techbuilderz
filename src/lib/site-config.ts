export const CONTACT_EMAIL = "team@techbuilderz.in";
export const WHATSAPP_NUMBER = "+91 93984 31573";
export const WHATSAPP_LINK = "https://wa.me/919398431573";
export const SITE_URL = "https://techbuilderz.in";

/** Set VITE_WEB3FORMS_ACCESS_KEY in .env.local (see .env.example). */
export const WEB3FORMS_ACCESS_KEY =
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim() ?? "";

export const HERO_STATS = [
  { n: "08", label: "Projects shipped" },
  { n: "06", label: "Service lines" },
  { n: "24H", label: "Reply window" },
] as const;
