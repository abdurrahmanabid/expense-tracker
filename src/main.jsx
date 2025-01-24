import { SnackbarProvider } from "notistack";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import store from "./app/store";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SnackbarProvider
      maxSnack={3} // Limits the number of notifications displayed at a time
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }} // Controls where notifications appear
    >
      <Provider store={store}>
        <App />
      </Provider>
    </SnackbarProvider>
  </StrictMode>
);
