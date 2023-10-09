import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="img/logo.png" />
          {/* <link rel="manifest" href="/site.webmanifest" /> */}
          {/* <link
            href="https://fonts.googleapis.com/css?family=Poppins&display=optional"
            rel="stylesheet"
          /> */}
          <link
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100&display=optional"
            rel="stylesheet"
          />
        </Head>
        <body className="h-full w-full">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
