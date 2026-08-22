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
      default: "#F8F8F6", // sahifa foni (deyarli oq)
      paper: common.white, // kartochkalar foni
    },
    primary: {
      contrastText: common.white,
      main: "#2F5233", // yashil tugmalar (Add to Cart, Login, Register)
      light: "#4C7A52",
      dark: "#1F3A24",
    },
    secondary: {
      contrastText: common.white,
      main: "#1A1A1A", // qora navbar / hero fon
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
      primary: "#1A1A1A",
      secondary: "#6B6B6B", // narx tagidagi tavsif, meta matnlar
      dark: common.black,
    },
    divider: "#E5E5E5",
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
        body: { background: "#F8F8F6", height: "100%", minHeight: "100%" },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
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
