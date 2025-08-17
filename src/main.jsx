import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom"; // <-- Add this import
import "./index.css";
import MainRouter from "./MainRouter";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={MainRouter} />
  </StrictMode>
);
