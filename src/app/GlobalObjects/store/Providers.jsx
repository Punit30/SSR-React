"use client";

import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";
import store, { localPersistConfig, persistore } from "./store";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "@/apis/apollo-client";
import Theme from "@/Constants/Theme";

import { SnackbarProvider } from "notistack";
import MuiAlert from "@/components/utilities/MuiAlert";
import { ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function Providers({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  useEffect(() => {
    const crossBrowserListener = () => {
      return async function () {
        const localState = await getStoredState(localPersistConfig);

        store.dispatch({
          type: REHYDRATE,
          key: localPersistConfig.key,
          payload: localState,
        });
      };
    };

    const appHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty("--window-height", `${window.innerHeight}px`);
    };

    appHeight();
    crossBrowserListener();

    window.addEventListener("resize", appHeight);
    window.addEventListener("storage", crossBrowserListener);

    return () => {
      window.removeEventListener("resize", appHeight);
      window.removeEventListener("storage", crossBrowserListener);
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistore}>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={Theme}>
            <SnackbarProvider
              maxSnack={2}
              Components={{ "mui-alert": MuiAlert }}
              anchorOrigin={{ horizontal: "center", vertical: "top" }}
            >
              {children}
            </SnackbarProvider>
          </ThemeProvider>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
}
