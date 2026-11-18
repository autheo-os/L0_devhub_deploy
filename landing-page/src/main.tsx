import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { railById, type PageId } from "./rails";
import "./styles.css";

const page = document.body.dataset.page as PageId | undefined;
const selectedPage: PageId = page && page in railById ? page : "home";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App page={selectedPage} />
  </StrictMode>,
);
