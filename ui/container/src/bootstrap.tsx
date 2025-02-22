// import "./sentry";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store";
import "./translations";
import "./assets/styles/Index.less";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./theme"; // Import your custom theme

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <PersistGate loading={null} persistor={persistor}>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </PersistGate>
      </ThemeProvider>
    </Provider>
  // </React.StrictMode>
);
