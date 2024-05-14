import { createGlobalStyle } from "styled-components";

// https://coolors.co/6b3d7c-a43e6e-dd3f60-fa624b-fa8233-faa21b-cfd9ee-a6c4e2-7cafd6-2885be
// https://coolors.co/311847-891a3d-e11b33-ff7538-ffcc33-118ab2-b0e0e6-1eb980-045d56

/* Array */

export const Colors = {
  mono: ["#0a0a0a", "#1e1e1e", "#323232", "#595959", "#7f7f7f", "#a5a5a5", "#cccccc", "#ebebeb", "#f5f5f5", "#ffffff"],
  bright: {
    purple: "#311847ff",
    magenta: "#891a3dff",
    red: "#e11b33ff",
    orange: "#ff7538ff",
    yellow: "#ffcc33ff",
    blue: "#118ab2ff",
    green: "#045d56ff",
  },
  pastel: {
    purple: "#7439a7ff",
    magenta: "#db4373ff",
    red: "#ee6d7cff",
    orange: "#ffa985ff",
    yellow: "#ffdb70ff",
    blue: "#44c3eeff",
    green: "#079d90ff",
  },
  misc: {
    purple: "#6b3d7cff",
    magenta: "#a43e6eff",
    red: "#E94256ff",
    orange: "#fa8233ff",
    yellow: "#d2ca23",
    blue: "#0E90DBff",
    green: "#0B9E43ff",
  },
  text: {
    primary: "#586069ff",
    secondary: "#586069ff",
    tertiary: "#6a737dff",
    link: "#0366d6ff",
    danger: "#cb2431ff",
    success: "#22863aff",
  },
};

type ColorKey = keyof typeof Colors;
type ColorKind<T extends ColorKey> = keyof (typeof Colors)[T];

export const GlobalStyle = createGlobalStyle`
  :root {
    ${Object.keys(Colors)
      .map((key) =>
        Object.keys(Colors[key as ColorKey])
          .map((kind) => {
            const colorkey = key as ColorKey;
            const colorkind = kind as ColorKind<typeof colorkey>;
            return `--color-${colorkey}-${colorkind}: ${Colors[colorkey][colorkind]};`;
          })
          .join("\n"),
      )
      .join("\n")}          
  }
  html {
    font-family: "Inter", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 1rem;
    color: #000;
    max-width: 100vw;
    margin: 0;
  }
  
  @supports (font-variation-settings: normal) {
    html {
      font-family: "Inter var", sans-serif;
      font-feature-settings: normal;
    }
    /* use small-cap alternate glyphs */
    .smallcaps {
      font-feature-settings: "smcp" on;
    }

    /* convert both upper and lowercase to small caps (affects punctuation also) */
    .allsmallcaps {
      font-feature-settings: "c2sc", "smcp";
    }

    /* use zeros with a slash through them to differentiate from "O" */
    .nicezero {
      font-feature-settings: "zero";
    }

    /* enable historical forms */
    .hist {
      font-feature-settings: "hist";
    }

    /* disable common ligatures, usually on by default */
    .noligs {
      font-feature-settings: "liga" 0;
    }

    /* enable tabular (monospaced) figures */
    td.tabular {
      font-feature-settings: "tnum";
    }

    /* enable automatic fractions */
    .fractions {
      font-feature-settings: "frac";
    }

    /* use the second available swash character */
    .swash {
      font-feature-settings: "swsh" 2;
    }

    /* enable stylistic set 7 */
    .fancystyle {
      font-family: Gabriola; /* available on Windows 7, and on Mac OS */
      font-feature-settings: "ss07";
    }
  }


`;
