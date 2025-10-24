import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { AppProvider } from "./context/AppContext.jsx";
import {MotionConfig} from 'motion/react'


const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <AppProvider>
      <MotionConfig viewport= {{once: true}}>
      <App />
      </MotionConfig>
    </AppProvider>
  </BrowserRouter>
);
