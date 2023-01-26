import UserManagement from "../pages/Users/routes";
import * as DashboardRoutes from "../pages/Dashboard/routes";

export const siteMap = {
  UserManagement,
  ...DashboardRoutes
};
export const SidebarRoutes ={
  UserManagement
}