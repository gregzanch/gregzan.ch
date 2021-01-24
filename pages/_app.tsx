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
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default App;
