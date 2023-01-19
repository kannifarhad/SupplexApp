import { ApolloProvider } from "@apollo/client";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import apolloClient from "./clients/apolloClient";
import { siteMap } from "./routes";
import { ProtectedRoute, PublicRoute } from './routes/RouteTypes';
import DynamicImport from './components/Molecules/DynamicImport';

const App = () => {
    return (
        <ApolloProvider client={apolloClient}>
            <BrowserRouter>
            <Routes>
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
                            <ProtectedRoute
                                    userLevel={userLevel}
                                    sidebarCollapsed={sidebarCollapsed}
                                >
                                    {Component && ( <DynamicImport component={Component} /> )}
                                </ProtectedRoute>
                        }
                    />
                    );
                })}
                </Routes>
            </BrowserRouter>
        </ApolloProvider>
    );
};

export default App;


