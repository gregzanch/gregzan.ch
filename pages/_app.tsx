import Head from 'next/head';
import { Colors, GlobalStyle } from "components/StyleGuide";
import { ThemeProvider } from "styled-components";
import "./index.css";

const theme = {
  colors: {
    primary: Colors.bright.orange,
    secondary: Colors.bright.red,
  },
};

type Props = {
  Component: React.FC;
  pageProps: JSX.IntrinsicAttributes &
    Record<number | string | symbol, unknown>;
};

function App({ Component, pageProps }: Props) {
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#ededed"/>
        <meta name="theme-color" content="#ededed"/>

        <title>gregzan.ch</title>
        <meta name="title" content="gregzan.ch"/>
        <meta name="description" content="I'm a mechanical, acoustical, and software engineer. My research interests revolve around scientific computing, primarily computational acoustics."/>


        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://gregzan.ch/"/>
        <meta property="og:title" content="gregzan.ch"/>
        <meta property="og:description" content="I'm a mechanical, acoustical, and software engineer. My research interests revolve around scientific computing, primarily computational acoustics."/>
        <meta property="og:image" content="/img/cram3.png"/>


        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content="https://gregzan.ch/"/>
        <meta property="twitter:title" content="gregzan.ch"/>
        <meta property="twitter:description" content="I'm a mechanical, acoustical, and software engineer. My research interests revolve around scientific computing, primarily computational acoustics."/>
        <meta property="twitter:image" content="/img/cram3.png"/>
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default App;
