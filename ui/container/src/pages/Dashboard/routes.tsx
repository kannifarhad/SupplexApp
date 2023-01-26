import { lazy } from "react";
import { SiteRoute } from "../../routes/types";

export const DashboardRoutes = new SiteRoute({
    title: "Dashboard",
    path: "/",
    description: "Main Page",
    component: lazy(() => import("./Dashboard")),
    exact: true,
});

export const UserProfile = new SiteRoute({
    title: "User Profile",
    path: "/profile",
    description: "Control user accesses to Dashboard",
    component: lazy(() => import("./Profile")),
    exact: true,
});

export const Logout = new SiteRoute({
    title: "Logout",
    path: "/logout",
    description: "logout",
    component: lazy(() => import("./Logout")),
    exact: true,
});