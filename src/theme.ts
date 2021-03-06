const dark = {
  name: "dark",
  breakpoints: ["360px", "480px", "1024px", "1280px"],
  colors: {
    text: "#efefef",
    back: "#000",
    primary: "#FFBC52",
    secondary: "#EF457A",
    accent: "#00b2de",
    highlight: "#F7EBFF",
    muted: "#454545",
    gray: "#666",
    darken: "#222",
    shadow: "rgba(0, 0, 0, 0.72)",
    dimmedShadow: "rgba(0, 0, 0, 0.56)"
  },
  fonts: {
    body: "Inter, sans-serif",
    heading: "Inter, sans-serif"
  },
  fontSizes: [12, 14, 16, 22, 26, 32, 48, 64],
  fontWeights: {
    body: 400,
    bold: 600,
    heading: 900
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25
  },
  radii: {
    default: "3px",
    plus: "5px",
    extra: "8px"
  },
  shadows: {
    default: "0 0.385rem 1.15rem 2px rgba(0,0,0,0.44)",
    large: "0 0.4rem 1rem 3px rgba(0,0,0,0.64)"
  },
  sizes: ["100%", 100, 200, 300, 400, 500, 12, 18, 24],
  space: [0, "0.25rem", "0.5rem", "1rem", "1.5rem", "2rem", "3rem"],
  buttons: {
    ghost: {
      background: "transparent"
    },
    outline: {
      background: "transparent",
      border: "solid 2px",
      borderColor: "text"
    }
  }
}
const light = {
  ...dark,
  name: "ligth",
  colors: {
    ...dark.colors,
    text: "#000",
    back: "#efefef",
    // primary: "#FFBC52",
    // secondary: "#EF457A",
    // accent: "#00b2de",
    // highlight: "#F7EBFF",
    // muted: "#454545",
    // gray: "#666",
    // darken: "#222"
  },
}
export default {
  dark: dark,
  light: light
}
