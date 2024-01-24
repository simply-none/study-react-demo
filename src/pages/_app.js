import { StrictMode } from "react";
import Layout from "../components/layout";

export default function MyApp({ Component, pageProps }) {
  return (
    <StrictMode>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StrictMode>
  );
}
