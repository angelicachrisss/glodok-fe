// pages/_app.js
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { GlobalStyles } from "@mui/material";
import Head from "next/head"; // Import Head dari next/head
import theme from "../src/theme";
import { Toaster } from 'react-hot-toast';

const globalStyles = {
  body: {
    padding: 0,
    margin: 0,
    boxSizing: "border-box",
  },
  "*": {
    boxSizing: "border-box",
  },
};

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <Head>
        <meta
          name="viewport"
          content="height=device-height, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0, width=device-width"
        />
        <meta name="googlebot" content="noindex" />
        <meta name="robots" content="noindex" />
        <title>Pesona Glodok</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
