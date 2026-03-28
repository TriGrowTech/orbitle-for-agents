import { createBrowserRouter } from "react-router";
import { AdminLayout } from "./components/AdminLayout";
import { Dashboard } from "./components/Dashboard";
import { BrandingSettings } from "./components/BrandingSettings";
import { Packages } from "./components/Packages";
import { Leads } from "./components/Leads";
import { Banners } from "./components/Banners";
import { ContentSections } from "./components/ContentSections";
import { Testimonials } from "./components/Testimonials";
import { SEOAnalytics } from "./components/SEOAnalytics";
import { Pricing } from "./components/Pricing";
import { LegalPages } from "./components/LegalPages";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AdminLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "branding", Component: BrandingSettings },
      { path: "packages", Component: Packages },
      { path: "leads", Component: Leads },
      { path: "banners", Component: Banners },
      { path: "content", Component: ContentSections },
      { path: "testimonials", Component: Testimonials },
      { path: "seo", Component: SEOAnalytics },
      { path: "pricing", Component: Pricing },
      { path: "legal", Component: LegalPages },
    ],
  },
]);