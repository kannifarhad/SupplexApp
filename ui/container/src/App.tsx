import { ApolloProvider } from "@apollo/client";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import apolloClient from "./clients/apolloClient";
import { siteMap } from "./routes";
import DashboardWrapp from './pages/Dashboard/DashboardWrapp';
import Login from './pages/Dashboard/AuthPage';
import { ProtectedRoute, PublicRoute } from './routes/RouteTypes';
import DynamicImport from './components/Molecules/DynamicImport';
import NotFound from './pages/Dashboard/Dump';
    
const App = () => {
    return (
        <ApolloProvider client={apolloClient}>
            <BrowserRouter>
            <Routes>
                <Route
                    path="login"
                    element={<PublicRoute><Login /></PublicRoute> }
                />
                {/* <Route
                    path="logout"
                    element={ <PublicRoute><Logout /></PublicRoute> }
                />
                <Route
                    path="downtime"
                    element={ <PublicRoute> <DefaultNotice /> </PublicRoute> }
                /> */}
                {Object.values(siteMap)
                .map((route, index) => {
                    const {
                        path,
                        component: Component,
                        userLevel,
                        sidebarCollapsed,
                    } = route;
                    return (
                    <Route
                        key={index + route.path}
                        path={path}
                        element={
                            <DashboardWrapp>
                                <ProtectedRoute
                                    userLevel={userLevel}
                                    sidebarCollapsed={sidebarCollapsed}
                                >
                                    {Component && ( <DynamicImport component={Component} /> )}
                                </ProtectedRoute>
                            </DashboardWrapp>
                        }
                    />
                    );
                })}
                <Route path="*" element={<NotFound />} />
            </Routes>
            </BrowserRouter>
        </ApolloProvider>
    );
};

export default App;


