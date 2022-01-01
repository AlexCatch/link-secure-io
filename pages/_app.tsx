import '../styles/globals.css'
import ErrorView from "../components/error-view";

function MyApp({ Component, pageProps }) {
  if (pageProps.error) {
    return <ErrorView />;
  }
  return <Component {...pageProps} />
}

export default MyApp
