import { lazy } from "react";
import { SiteRoute } from "../../routes/types";
import { UserRole } from "../../types";

export const DashboardRoutes = new SiteRoute({
    title: "Dashboard",
    path: "/",
    description: "Main Page",
    component: lazy(() => import("./Dashboard")),
});

export const Configuration = new SiteRoute({
    title: "Configuration",
    path: "/config",
    description: "Configuration of the system",
    component: lazy(() => import("./Configuration")),
    accessRoles: [UserRole.ADMIN, UserRole.CONSUMER],
    showInMenu: true,
    iconName: "fa-gear"
});