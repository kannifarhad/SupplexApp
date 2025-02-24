import ArticleRoutes from "../pages/Articles/routes";
import UserManagement from "../pages/Users/routes";
import * as DashboardRoutes from "../pages/Dashboard/routes";
import { Configuration } from "../pages/Dashboard/routes";

export const siteMap = {
  UserManagement,
  ArticleRoutes,
  ...DashboardRoutes
};
export const SidebarRoutes ={
  UserManagement,
  ArticleRoutes,
  Configuration
}