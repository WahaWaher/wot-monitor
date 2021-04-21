const themeDefaults = {
  fonts: {
    main: 'Roboto, Helvetica, Arial, sans-serif',
    sub: 'Roboto Condensed, Helvetica, Arial, sans-serif',
  },
  palette: {
    text: {
      main: '#b8b8a2',
      light: '#f9f5e1',
    },
    background: {
      extraDark: '#101010',
      main: '#1c1c1e',
      light: '#252529',
    },
    accent: {
      main: '#f25322',
      light: '#fab81b',
    },
    danger: {
      main: '#bc2515',
    },
    warning: {
      main: '#fab81b',
    },
    success: {
      main: '#67af4c',
    },
  },
  typography: {
    htmlFontSize: 14,
    fontSize: '1rem',
    lineHeight: 1.35,
    titles: {
      1: '1.65rem',
      2: '1.45rem',
      3: '1.25rem',
      4: '1rem',
      5: '0.85rem',
      6: '0.65rem',
    },
  },
  spacers: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '1rem',
    4: '1.5rem',
    5: '3rem',
    6: '6rem',
  },
  grid: {
    gutterWidth: 12,
  },
  transitions: {
    duration: {
      main: 0.15,
    },
  },
};

export default themeDefaults;
