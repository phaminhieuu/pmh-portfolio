import { AnimatePresence } from "framer-motion";
import Fonts from "../components/fonts";
import Layout from "../components/layouts/main";
import "../styles/globals.css";

function Website({ Component, pageProps, router }) {
  return (
    <>
      <AnimatePresence exitBeforeEnter initial={true}>
        <Layout router={router}>
          <Component {...pageProps} key={router.route} />
        </Layout>
      </AnimatePresence>
    </>
  );
}

export default Website;
