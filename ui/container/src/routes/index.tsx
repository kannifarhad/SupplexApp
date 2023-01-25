import * as SidebarRoutes from "./UserRoutes";
import * as DashboardRoutes from "./DashboardRoutes";

export const siteMap = {
  ...SidebarRoutes,
  ...DashboardRoutes
};

