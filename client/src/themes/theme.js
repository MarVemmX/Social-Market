import { createTheme } from '@material-ui/core';

export function themeConfig({ isDarkMode }) {
  return createTheme({
    palette: {
      type: isDarkMode ? 'dark' : 'light',
      primary: {
        main: isDarkMode ? '#26a69a' : '#009688',
        dark: '#00695c',
      },

      secondary: {
        main: '#00695c',
      },
      warning: {
        main: '#ff9800',
        dark: '#f57c00',
      },
      background: {
        paper: isDarkMode ? 'rgb(0,30,60)' : '#ffffff',
        default: isDarkMode ? 'rgb(10,25,41)' : '#efefef',
      },
      common: {
        black: '#000000',
        white: '#ffffff',
      },
      text: {
        primary: isDarkMode ? '#ffffff' : '#000000',
      },
      grey: {
        50: '#fafafa',
        100: '#f5f5f5',
        200: '#eeeeee',
        300: '#e0e0e0',
        400: '#bdbdbd',
        500: '#9e9e9e',
        600: '#757575',
        700: '#616161',
        800: '#424242',
        900: '#212121',
        A100: '#d5d5d5',
        A200: '#aaaaaa',
        A400: '#303030',
        A700: '#616161',
      },
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      fontSize: 12,
    },
  });
}
