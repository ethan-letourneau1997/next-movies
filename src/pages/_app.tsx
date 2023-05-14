import { AppProps } from "next/app";
import Head from "next/head";
import Layout from "@/components/layout";
import { MantineProvider } from "@mantine/core";
import { SpotlightProvider } from "@mantine/spotlight";
// import { actions } from "@/components/spotlight";
import { getActions } from "../../api/spotlight/getActions";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Cinegraph</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "dark",
        }}
      >
        {/* <SpotlightProvider actions={actions}> */}
        <Layout>
          <Component {...pageProps} />
        </Layout>
        {/* </SpotlightProvider> */}
      </MantineProvider>
    </>
  );
}
