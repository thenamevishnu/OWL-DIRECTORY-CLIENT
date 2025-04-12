import { createRoot } from "react-dom/client";
import { Routes } from "./Routes";
import { Provider } from "react-redux";
import { persistor, store } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css"
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

const container = document.getElementById("root");

const root = createRoot(container);

const element = <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
            <Routes />
            <Toaster position="top-right" toastOptions={{ duration: 2000}}/>
        </Provider>
    </PersistGate>
</GoogleOAuthProvider>

root.render(element);