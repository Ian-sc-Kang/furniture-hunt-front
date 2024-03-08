import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../../createEmotionCache";
import "./global.css";
import {
  Box,
  CircularProgress,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import { Analytics } from "@vercel/analytics/react";
import CircularStatic from "@/components/loading";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#3C3431",
    },
  },
});

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const handleStart = (url: string) => {
      url !== router.asPath && setLoading(true);
    };
    const handleComplete = (url: string) => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <ThemeProvider theme={theme}>
        {loading ? <CircularStatic /> : <Component {...pageProps} />}
      </ThemeProvider>
      <Analytics />
    </CacheProvider>
  );
}
