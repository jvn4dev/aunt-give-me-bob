import { QueryClient, QueryClientProvider } from "react-query";
import { initializeFirebase } from "../utils/firebase";

import "../styles/globals.css";

// Create a client
const queryClient = new QueryClient();

initializeFirebase();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
