// import "./sentry";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// import "./styles/App.less";
// import * as serviceWorker from "./serviceWorker";
import store, { persistor } from "./store";
import "./translations";
import "./assets/styles/PerfectScroll.css";
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
