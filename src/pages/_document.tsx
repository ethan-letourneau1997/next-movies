import Document, { Head, Html, Main, NextScript } from "next/document";

import Navigation from "@/components/Navbar";
import { createGetInitialProps } from "@mantine/next";

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />

          <NextScript />
        </body>
      </Html>
    );
  }
}
