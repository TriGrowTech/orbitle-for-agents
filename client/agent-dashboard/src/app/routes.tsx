import React from 'react';
import { createBrowserRouter, Navigate } from "react-router";
import { AdminLayout } from "./layouts/AdminLayout";
import { Dashboard } from "./pages/Dashboard";
import { BrandingSettings } from "./pages/BrandingSettings";
import { Packages } from "./pages/Packages";
import { Leads } from "./pages/Leads";
import { Banners } from "./pages/Banners";
import { ContentSections } from "./pages/ContentSections";
import { Testimonials } from "./pages/Testimonials";
import { SEOAnalytics } from "./pages/SEOAnalytics";
import { Pricing } from "./pages/Pricing";
import { LegalPages } from "./pages/LegalPages";
import { Profile } from "./pages/Profile";
import { RevenueAnalytics } from "./pages/RevenueAnalytics";
import { OnboardingPage } from "./pages/OnboardingPage";
export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/signup",
    element: <Navigate to="/dashboard" replace />,
  },
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

// Note: In main.tsx or indexed.tsx, wrap the RouterProvider with AuthProvider
// For now, I'm just exporting the router.