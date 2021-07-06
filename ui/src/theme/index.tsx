import GlobalBaseStyles from '@/theme/GlobalBaseStyles';
import GlobalUtilStyles from '@/theme/GlobalUtilStyles';
import themeDefaults, { ThemeDefaultsType } from '@/theme/themeDefaults';
import { CssSizesInputType, genCssSizes } from '@/utils';
import { FC, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import tinycolor, { ColorInput } from 'tinycolor2';

const utils = {
  getNum: (val: string): number => parseFloat(val),
  genSizes: (val: CssSizesInputType): string => genCssSizes(val),
  darken: (color: ColorInput | ColorsTrfRes, amount?: number): ColorsTrfRes => {
    return tinycolor(color).darken(amount).toString();
  },
  lighten: (
    color: ColorInput | ColorsTrfRes,
    amount?: number
  ): ColorsTrfRes => {
    return tinycolor(color).lighten(amount).toString();
  },
  brighten: (color: ColorInput, amount?: number): ColorsTrfRes => {
    return tinycolor(color).brighten(amount).toString();
  },
  toRgba: (
    color: ColorInput | ColorsTrfRes,
    alpha: number = 1
  ): ColorsTrfRes => {
    const res = tinycolor(color);

    res.toRgbString();
    res.setAlpha(alpha);

    return res.toString();
  },
};

type ThemeUtilsType = {
  utils: typeof utils;
};

type ThemeActionsType = {
  actions: { changeTheme: (prevTheme: any) => void };
};

export type ThemeConfigType = ThemeDefaultsType &
  ThemeActionsType &
  ThemeUtilsType;

type ColorsTrfRes = string | undefined;

export const useCreateTheme = (): ThemeConfigType => {
  const [theme, setTheme] = useState<ThemeConfigType>({
    ...themeDefaults,
    actions: { changeTheme },
    utils,
  });

  function changeTheme(prevTheme: ThemeConfigType): void {
    setTheme(prevTheme);
  }

  return theme;
};

export const AppTheme: FC = ({ children, ...rest }) => {
  const theme = useCreateTheme();

  return (
    <ThemeProvider theme={theme} {...rest}>
      <GlobalBaseStyles />
      <GlobalUtilStyles />
      {children}
    </ThemeProvider>
  );
};
