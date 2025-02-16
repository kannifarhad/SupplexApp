import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import apolloClient from "./services/clients/apolloClient";
import { siteMap, } from "./routes";
import { SiteRoute } from "./routes/types";
import DashboardWrapp from './pages/Dashboard/DashboardWrapp';
import Login from './pages/Dashboard/AuthPage';
import { ProtectedRoute, PublicRoute } from './routes/RouteTypes';
import DynamicImport from './components/Molecules/DynamicImport';
import NotFound from './pages/Dashboard/NotFound';

type RenderRoutesProps = { routes: SiteRoute[], parentRoute?: string };

/**
 * Utility to generate full route paths properly.
 */
const getFullPath = (parentRoute: string | undefined, path: string): string => {
  const normalizedParent = parentRoute ? `/${parentRoute.replace(/^\/|\/$/g, '')}` : '';
  const normalizedPath = `/${path.replace(/^\/|\/$/g, '')}`;
  return `${normalizedParent}${normalizedPath}`;
};

const renderRoutes = ({ routes, parentRoute }: RenderRoutesProps) => {
  return routes.map((route, index) => {
    const { path, title, description, component: Component, children } = route;
    const fullPath = getFullPath(parentRoute, path);
    if(parentRoute){
        return (
            <Route
              key={index + fullPath}
              path={fullPath}
              element={Component ? <DynamicImport component={Component} componentProps={{ title, description }} /> : <Outlet />}
            >
              {children && renderRoutes({routes: children, parentRoute: path })}
            </Route>
        )
    }
    return (
      <Route
        key={index + fullPath}
        path={fullPath}
        element={
          <DashboardWrapp>
            <ProtectedRoute accessRoles={route.accessRoles}>
              {Component ? <DynamicImport component={Component} componentProps={{ title, description }}/> : <Outlet />}
            </ProtectedRoute>
          </DashboardWrapp>
        }
      >
        {children && renderRoutes({routes: children, parentRoute: path })}
      </Route>
    );
  });
};

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          {renderRoutes({routes: Object.values(siteMap)})}
          <Route
            path="*"
            element={
              <DashboardWrapp >
                <ProtectedRoute>
                  <DynamicImport component={NotFound} />
                </ProtectedRoute>
              </DashboardWrapp>
            }
          />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;