import React from "react";
interface RouteDetails {
  title: string;
  path: string;
  description: string;
  component: React.LazyExoticComponent<React.FC<any>> | null;
  componentProps: { [key: string]: any };
  exact: boolean | undefined;
  iconName: string;
  showInMenu: boolean;
  accessId: string;
  requiresAccess: boolean;
  ignoredParams: string[];
  children: RouteDetails[];
  parentPath: string;
  getPath: (params?: any) => string;
}

export class SiteRoute<TParams extends object = {}> implements RouteDetails {
  title: string = "";
  path = "";
  parentPath = "";
  description = "";
  showInMenu: boolean = true;
  component: React.LazyExoticComponent<React.FC<any>> | null = null;
  componentProps = {};
  exact: boolean | undefined;
  requiresAccess: boolean = true;
  accessId: string = "";
  ignoredParams: string[] = [];
  iconName: string = "";
  children: RouteDetails[] = [];

  constructor(data: Partial<SiteRoute>) {
    Object.assign(this, data);
  }

  getPath(params: { [key in keyof TParams]: string }): string {
    let path = this.path;
    let parentPath = this.parentPath;
    for (const param in params) {
      if (!params[param]) continue;
      path = path.replace(`:${param}`, params[param]);
    }
    return parentPath + path;
  }

}
