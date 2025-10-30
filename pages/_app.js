// pages/_app.js
import Head from "next/head";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import "../styles/customStyles.css";
import { Provider } from "react-redux";
import store from "@/Redux/store";
 
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const defaultTitle = "urcaffe";

  return (
    <>
      <Head>
        {/* key="title" lets page titles replace this when needed */}
        <title key="title">{Component.title || defaultTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Favicon (see logo section below) */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}  >
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
