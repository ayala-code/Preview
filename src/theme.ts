import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: 'rgba(0, 0, 0, 0.6)',
    },
    background: {
      default: '#fffaf2', // צבע הרקע הכללי של האתר
      paper: '#fff',
    },
  },
  // תוכל להוסיף כאן קסטומיזציה של צבעים, טיפוגרפיה וכו
});

export default theme;
