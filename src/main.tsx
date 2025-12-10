import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { Providers } from "./app/providers.tsx";
import "./lib/i18n";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Providers>
    <App />
  </Providers>
);
