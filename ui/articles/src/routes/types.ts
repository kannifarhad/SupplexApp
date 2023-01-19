import React from "react";
import { UserRole } from "../types";


interface RouteDetails {
  title: string;
  path: string;
  description: string;
  component: React.LazyExoticComponent<React.FC<{}>> | null;
  exact: boolean | undefined;
  string: string | undefined;
  showInMenu: boolean;
  // User role level required to view the page
  userLevel: Array<keyof typeof UserRole>;
  // True if needs an active project
  requiresProject: boolean;
  // URL search params to ignore
  ignoredParams: string[];
}

export class SiteRoute<TParams extends object = {}> implements RouteDetails {
  title: string = "";
  path = "";
  isExternal = false;
  description = "";
  sidebarCollapsed = false;
  showInMenu: boolean = true;
  component: React.LazyExoticComponent<React.FC<{}>> | null = null;
  exact: boolean | undefined;
  requiresProject: boolean = true;
  ignoredParams: string[] = [];
  string: string = "circle";
  userLevel: Array<"ADMIN" | "ANALYST" | "CONSUMER"> = ["CONSUMER"];
  constructor(data: Partial<SiteRoute>) {
    Object.assign(this, data);
  }

  getPath(params: { [key in keyof TParams]: string }, queryParams?:{ [key: string]: string }): string {
    let path = this.path;
    let query = '';
    if(Boolean(queryParams)){
      query = `?${new URLSearchParams(queryParams).toString()}`;
    }

    for (const param in params) {
      if (!params[param]) continue;
      if (param === "projectId") {
        const search = new URLSearchParams({ projectId: params[param] }).toString();
        query += Boolean(query) ? `${query}${search}` : `?${search}`;
      } else {
        path = path.replace(`:${param}`, params[param]);
      }
    }
    return path + query;
  }
}
