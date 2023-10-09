import type { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";
import { Fragment, useEffect } from "react";

import "../styles/bootstrap.min.css";
import "../styles/globals.css";

import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { useAppStore } from "@/stores";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  const userLogin = useAppStore((state) => state.userLoggedIn);
  const router = useRouter();

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  useEffect(() => {
    if (!userLogin) {
      if (router.pathname != "/login") {
        router.replace("/login");
      }
    }
  }, [userLogin]);

  return (
    <Fragment>
      <SnackbarProvider
        className="z-[9999]"
        maxSnack={3}
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      />
      {(userLogin || router.pathname === "/login") && (
        <Component {...pageProps} />
      )}
    </Fragment>
  );
}

export default MyApp;
