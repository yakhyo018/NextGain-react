import { createTheme } from "@mui/material/styles";
import { common } from "@mui/material/colors";
import shadow from "./shadow";
import typography from "./typography";

/**
 * LIGHT THEME (DEFAULT) — SportPit dizayniga moslangan
 */
const light = {
  palette: {
    type: "light",
    background: {
      default: "#F6F2E9", // sahifa foni (krem) — Soft Pastel
      paper: common.white, // kartochkalar foni
    },
    primary: {
      contrastText: common.white,
      main: "#1A1B2E", // to'q siyoh tugmalar (Soft Pastel, 2026-11-10)
      light: "#3A3B56",
      dark: "#121326",
    },
    secondary: {
      contrastText: common.white,
      main: "#1A1B2E", // matn / to'q yuzalar
      light: "#333333",
      dark: "#000000",
    },
    error: {
      main: "#E63946", // chegirma belgisi (-10%)
    },
    warning: {
      main: "#F5A623", // yulduzcha reyting rangi
    },
    text: {
      primary: "#1A1B2E",
      secondary: "#4D4E6A", // narx tagidagi tavsif, meta matnlar
      dark: common.black,
    },
    divider: "#E4DED0",
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          height: "100%",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: { height: "100%" },
        body: { background: "#F6F2E9", height: "100%", minHeight: "100%" },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
  },
  shadow,
  typography,
};

// A custom theme for this app
let theme = createTheme(light);
theme = createTheme(theme, {
  components: {
    MuiContainer: {
      styleOverrides: {
        maxWidthLg: {
          [theme.breakpoints.up("lg")]: {
            maxWidth: "1300px",
          },
        },
      },
    },
  },
});

export default theme;
