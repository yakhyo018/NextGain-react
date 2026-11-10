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
      default: "#FFFDF8", // sahifa foni (krem) — Soft Pastel
      paper: common.white, // kartochkalar foni
    },
    primary: {
      contrastText: common.white,
      main: "#23243A", // to'q siyoh tugmalar (Soft Pastel, 2026-11-10)
      light: "#3A3B56",
      dark: "#121326",
    },
    secondary: {
      contrastText: common.white,
      main: "#23243A", // matn / to'q yuzalar
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
      primary: "#23243A",
      secondary: "#6C6D86", // narx tagidagi tavsif, meta matnlar
      dark: common.black,
    },
    divider: "#F1EFE8",
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
        body: { background: "#FFFDF8", height: "100%", minHeight: "100%" },
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
