import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import themeDefaults from '@/theme/themeDefaults';
import tinycolor from 'tinycolor2';
import genCssSizes from '@/utils/genCssSizes';
import GlobalBaseStyles from '@/theme/GlobalBaseStyles';
import GlobalUtilStyles from '@/theme/GlobalUtilStyles';

export const useCreateTheme = () => {
  const [theme, setTheme] = useState({
    ...themeDefaults,
    actions: { changeTheme },
    utils: {
      getNum: (val) => parseFloat(val),
      genSizes: (val) => genCssSizes(val),
      darken: (color, amount) => tinycolor(color).darken(amount).toString(),
      lighten: (color, amount) => tinycolor(color).lighten(amount).toString(),
      brighten: (color, amount) => tinycolor(color).brighten(amount).toString(),
      toRgba: (color, alpha) => {
        const res = tinycolor(color);

        res.toRgbString();
        res.setAlpha(alpha);

        return res.toString();
      },
    },
  });

  function changeTheme(prevTheme) {
    setTheme(prevTheme);
  }

  return theme;
};

export const AppTheme = ({ children, ...rest }) => {
  const theme = useCreateTheme();

  return (
    <ThemeProvider theme={theme} {...rest}>
      <GlobalBaseStyles />
      <GlobalUtilStyles />
      {children}
    </ThemeProvider>
  );
};
