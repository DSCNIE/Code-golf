import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import { MantineProvider } from "@mantine/core";

function MyApp({ Component, pageProps }) {
  return (
    <MantineProvider theme={{ colorScheme: "dark" }}>
      <NextNProgress
        color="#29D"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <Component {...pageProps} />
    </MantineProvider>
  );
}

export default MyApp;
