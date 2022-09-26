import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { initializeFirebase } from "../utils/firebase";

import "../styles/globals.css";
import { useState } from "react";

initializeFirebase();

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
