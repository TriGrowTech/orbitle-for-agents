import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "./components/DashboardLayout";
import { Login } from "./components/Login";
import { Overview } from "./components/Overview";
import { Agents } from "./components/Agents";
import { AgentDetail } from "./components/AgentDetail";
import { KYC } from "./components/KYC";
import { Payments } from "./components/Payments";
import { PricingPlans } from "./components/PricingPlans";
import { Offers } from "./components/Offers";
import { Notifications } from "./components/Notifications";
import { Support } from "./components/Support";
import { Operators } from "./components/Operators";
import { Calendar } from "./components/Calendar";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      { index: true, Component: Overview },
      { path: "agents", Component: Agents },
      { path: "agents/:id", Component: AgentDetail },
      { path: "kyc", Component: KYC },
      { path: "payments", Component: Payments },
      { path: "pricing-plans", Component: PricingPlans },
      { path: "offers", Component: Offers },
      { path: "notifications", Component: Notifications },
      { path: "support", Component: Support },
      { path: "calendar", Component: Calendar },
      { path: "operators", Component: Operators },
    ],
  },
]);
