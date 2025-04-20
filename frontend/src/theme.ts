import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: '#42a5f5',
    },
    secondary: {
      light: '#0066ff',
      main: '#ce93d8',
      contrastText: '#ffcc00',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    mode:'dark'
  }
});