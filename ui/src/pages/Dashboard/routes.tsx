import { lazy } from "react";
import { SiteRoute } from "../../routes/types";
import { UserRole } from "../../types";
import i18n from "src/translations";

export const DashboardRoutes = new SiteRoute({
    title: i18n.t("Dashboard")!,
    description: i18n.t("Main Page")!,
    path: "/",
    component: lazy(() => import("./Dashboard")),
});

export const Configuration = new SiteRoute({
    title: i18n.t("Configuration")!,
    description: i18n.t("Configuration of the system")!,
    path: "/config",
    component: lazy(() => import("./Configuration")),
    accessRoles: [UserRole.ADMIN, UserRole.CONSUMER],
    showInMenu: true,
    iconName: "fa-gear"
});