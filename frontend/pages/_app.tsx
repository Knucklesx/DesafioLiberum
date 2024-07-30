import isPropValid from "@emotion/is-prop-valid";
import GlobalStyle from "@src/theme/GlobalStyle";
import ThemeProvider from "@src/theme/ThemeProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StyleSheetManager } from "styled-components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <StyleSheetManager
        shouldForwardProp={(prop) =>
          isPropValid(prop) && prop !== "styleSheet" && prop !== "tag"
        }
      >
        <ThemeProvider>
          <GlobalStyle />
          <Component {...pageProps} />

          <ToastContainer autoClose={3000} />
        </ThemeProvider>
      </StyleSheetManager>
    </>
  );
}
