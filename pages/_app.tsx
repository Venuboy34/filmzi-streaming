import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Filmzi - Stream Movies & TV Series</title>
        <meta name="description" content="Stream and download your favorite movies and TV series on Filmzi" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://envs.sh/E9r.jpg" />
        <meta name="theme-color" content="#00ff00" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Filmzi - Stream Movies & TV Series" />
        <meta property="og:description" content="Stream and download your favorite movies and TV series on Filmzi" />
        <meta property="og:image" content="https://envs.sh/E9r.jpg" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Filmzi - Stream Movies & TV Series" />
        <meta name="twitter:description" content="Stream and download your favorite movies and TV series on Filmzi" />
        <meta name="twitter:image" content="https://envs.sh/E9r.jpg" />
        
        {/* Plyr CSS */}
        <link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css" />
        
        {/* Plyr JS */}
        <script src="https://cdn.plyr.io/3.7.8/plyr.js" async></script>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
