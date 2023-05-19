import { AppProps } from "next/app";
import Head from "next/head";
import { Inter } from "next/font/google";
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
                  ? theme.colors.brand[9]
                  : theme.white,
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.brand[1]
                  : theme.black,
              lineHeight: theme.lineHeight,
            },
          }),
          colors: {
            brand: [
              "#e5e4e5",
              "#cbc9cb",
              "#b1afb1",
              "#999699",
              "#817d81",
              "#6a666a",
              "#534f53",
              "#3e393e",
              "#2a252a",
              "#171217",
            ],
            accent: ["#ffd452"],
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
