import "../styles/globals.css";
import { MantineProvider, Button } from "@mantine/core";

function MyApp({ Component, pageProps }) {
  return (
    <MantineProvider theme={{ colorScheme: "dark" }}>
      <Component {...pageProps} />
    </MantineProvider>
  );
}

export default MyApp;
