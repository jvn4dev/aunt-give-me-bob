import { QueryClient, QueryClientProvider } from "react-query";

import "../styles/globals.css";

// Create a client
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
