import Head from "next/head";
import { Fragment } from "react";

export function Layout({
  children,
  description,
}: {
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <Fragment>
      <Head>
        <title>Kiềm Nghĩa Portal</title>
        <meta name="description" content={description || "Kiềm Nghĩa Portal"} />
      </Head>
      <main>
        {children}
      </main>
    </Fragment>
  );
}
