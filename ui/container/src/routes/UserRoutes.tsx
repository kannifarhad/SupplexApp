import { lazy } from "react";
import { SiteRoute } from "./types";

export const UserManagement = new SiteRoute({
    title: "User Management",
    path: "/system/users",
    description: "Control user accesses to  Dashboard",
    component: lazy(() => import("../pages/Dashboard/Dump")),
    exact: true,
    userLevel: ["ADMIN"],
});