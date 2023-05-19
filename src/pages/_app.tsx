import { Inter, Roboto } from "next/font/google";

import { AppProps } from "next/app";
import Head from "next/head";
import Layout from "@/components/layout/layout";
import { MantineProvider } from "@mantine/core";

const inter = Inter({ subsets: ["latin"] });

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <main className={inter.className}>
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
          // /** Put your mantine theme override here */
          colorScheme: "dark",
          // fontFamily: " muli, Source Serif Pro",

          globalStyles: (theme) => ({
            body: {
              ...theme.fn.fontStyles(),
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.brand[5]
                  : theme.white,
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.gray[4]
                  : theme.black,
              lineHeight: theme.lineHeight,
            },
          }),
          colors: {
            brand: ["#FFFFFF", "#313440", "#222733", "#151718", "#FED644", "#171217", "#040615"],
          },

          primaryColor: "brand",
          components: {
            Title: {
              styles: {
                root: {
                  color: "#dee2e6",
                },
              },
            },
            Card: {
              styles: {
                root: {
                  backgroundColor: "#59A494",
                },
              },
            },
          },
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MantineProvider>
    </main>
  );
}
