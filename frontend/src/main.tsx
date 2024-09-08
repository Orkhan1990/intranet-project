import { StrictMode } from "react";
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";
import { createRoot } from "react-dom/client";
import { persistor, store } from "./redux-toolkit/store/store.ts";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <App />
      </Provider>
    </PersistGate>
  </StrictMode>
);
