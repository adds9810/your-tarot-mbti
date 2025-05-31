export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export const pageView = (url: string) => {
  if (!GA_ID || typeof window.gtag !== "function") return;
  window.gtag("config", GA_ID, {
    page_path: url,
  });
};

export const event = (
  action: Gtag.EventNames,
  { event_category, event_label, value }: Gtag.EventParams
) => {
  if (!GA_ID || typeof window.gtag !== "function") return;
  window.gtag("event", action, {
    event_category,
    event_label,
    value,
  });
};
