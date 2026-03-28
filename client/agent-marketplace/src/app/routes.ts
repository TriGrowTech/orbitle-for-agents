import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import PackageDetail from "./pages/PackageDetail";
import RootLayout from "./pages/RootLayout";

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/package/:id",
        Component: PackageDetail,
      },
    ],
  },
]);