import HeadData from "../components/HeadData";
import NavBar from "../components/NavBar";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <HeadData />
      <NavBar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
