import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AdminContextProvider from "./context/AdminContext.jsx";
import PsikologContextProvider from "./context/PsikologContext.jsx";
import AppContextProvider from "./context/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminContextProvider>
      <PsikologContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </PsikologContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
);
