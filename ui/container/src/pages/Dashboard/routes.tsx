import { lazy } from "react";
import { SiteRoute } from "../../routes/types";

export const DashboardRoutes = new SiteRoute({
    title: "Dashboard",
    path: "/",
    description: "Main Page",
    component: lazy(() => import("./Dashboard")),
});

export const UserProfile = new SiteRoute({
    title: "User Profile",
    path: "/profile",
    description: "Your Profile where you can view or edit your information",
    component: lazy(() => import("./Profile")),
});

export const Logout = new SiteRoute({
    title: "Logout",
    path: "/logout",
    description: "logout",
    component: lazy(() => import("./Logout")),
});

export const Configuration = new SiteRoute({
    title: "Configuration",
    path: "/config",
    description: "Configuration of the system",
    component: lazy(() => import("./Dump")),
    showInMenu: true,
    iconName: "fa-gear"
});