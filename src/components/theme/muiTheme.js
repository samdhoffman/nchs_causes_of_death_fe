import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#003d71",
    },
    secondary: {
      main: "#f8981d",
    },
  },
  overrides: {
    MuiButton: {
      root: {
        "&:hover": {
          color: "#f8981d"
        }
      },
    },
    MuiTableCell: {
      alignRight: {
        color: "#003d71"
      }
    },
    MuiPaper: {
      root: {
        color: "#003d71"
      }
    },
    MuiPaginationItem: {
      page: {
        color: "#003d71",
        "&:hover": {
          color: "#f8981d"
        }
      }
    }
  },
});

export default theme;