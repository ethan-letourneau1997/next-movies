import "../styles/globals.css";

import { AppProps } from "next/app";
import Head from "next/head";
import { Inter } from "next/font/google";
import Layout from "@/components/layout/layout";
import { MantineProvider } from "@mantine/core";

// import fonts
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
          // fontFamily: "  muli, Source Serif Pro",

          globalStyles: (theme) => ({
            body: {
              ...theme.fn.fontStyles(),
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[9]
                  : theme.white,
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.gray[4]
                  : theme.black,
              lineHeight: theme.lineHeight,
            },
          }),
          colors: {
            brand: [
              "#FAFAFA",
              "#F4F4F5",
              "#E4E4E7",
              "#A1A1AA",
              "#A1A1AA",
              "#71717A",
              "#52525B",
              "#3F3F46",
              "#27272A",
              "#18181B",
            ],
            accent: ["#FFCA05"],
          },

          primaryColor: "brand",
          components: {
            Accordian: {
              defaultProps: {},
            },
            Title: {
              styles: {
                root: {
                  color: "#dee2e6",
                  fontFamily: "Montserrat",
                },
              },
            },
            Card: {
              styles: {
                root: {
                  backgroundColor: "#414141",
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
