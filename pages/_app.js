import { SWRConfig } from 'swr';
import Layout from '@/components/Layout';
import "bootstrap/dist/css/bootstrap.min.css";


function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <SWRConfig
        value={{
          fetcher: async (url) => {
            const res = await fetch(url);
            if (!res.ok) {
              const error = new Error('An error has been occurred ');
              error.info = await res.json();
              error.status = res.status;
              throw error;
            }
            return res.json();
          },
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </Layout>
  );
}

export default MyApp;
