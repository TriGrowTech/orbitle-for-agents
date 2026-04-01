import React from 'react';
import { createBrowserRouter, Navigate } from "react-router";
import { AdminLayout } from "./components/AdminLayout";
import { Dashboard } from "./components/Dashboard";
import { BrandingSettings } from "./components/BrandingSettings";
import { Packages } from "./components/Packages";
import { Leads } from "./components/leadmanagement/Leads";
import { Banners } from "./components/Banners";
import { ContentSections } from "./components/ContentSections";
import { Testimonials } from "./components/Testimonials";
import { SEOAnalytics } from "./components/SEOAnalytics";
import { Pricing } from "./components/Pricing";
import { LegalPages } from "./components/LegalPages";
import { Profile } from "./components/Profile";
import { RevenueAnalytics } from "./components/RevenueAnalytics";
import { OnboardingPage } from "./components/OnboardingPage";

export const router = createBrowserRouter([
  {
    path: "/onboarding",
    Component: OnboardingPage,
  },
  {
    path: "/",
    Component: AdminLayout,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", Component: Dashboard },
      { path: "branding", Component: BrandingSettings },
      { path: "packages", Component: Packages },
      { path: "leads", Component: Leads },
      { path: "banners", Component: Banners },
      { path: "content", Component: ContentSections },
      { path: "testimonials", Component: Testimonials },
      { path: "seo", Component: SEOAnalytics },
      { path: "revenue", Component: RevenueAnalytics },
      { path: "pricing", Component: Pricing },
      { path: "legal", Component: LegalPages },
      { path: "profile", Component: Profile },
    ],
  },
]);