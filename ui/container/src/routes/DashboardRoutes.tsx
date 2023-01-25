import { lazy } from "react";
import { SiteRoute } from "./types";

export const DashboardRoutes = new SiteRoute({
    title: "User Management",
    path: "/",
    description: "Control user accesses to  Dashboard",
    component: lazy(() => import("../pages/Dashboard/Dashboard")),
    exact: true,
});

export const UserProfile = new SiteRoute({
    title: "User Profile",
    path: "/profile",
    description: "Control user accesses to  Dashboard",
    component: lazy(() => import("../pages/Dashboard/Dashboard")),
    exact: true,
});