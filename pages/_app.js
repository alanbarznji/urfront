// pages/_app.js
import Head from "next/head";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import "../styles/customStyles.css";
import { Provider } from "react-redux";
import store from "@/Redux/store";
import ErrorBoundary from "@/src/components/ErrorBoundary";
 
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");

    // Setup global error handlers
    const handleError = (event) => {
      console.error('Global error caught:', event.error);
      // You can send this to an error tracking service
    };

    const handleUnhandledRejection = (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      // Prevent default unhandled rejection behavior
      event.preventDefault();
      // You can send this to an error tracking service
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
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
      <Provider store={store}>
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </Provider>
    </>
  );
}

export default MyApp;
