import { createGlobalStyle, css } from 'styled-components';
// Fonts
import RobotoRegular from '@/assets/fonts/RobotoRegular/RobotoRegular.woff2';
import RobotoItalic from '@/assets/fonts/RobotoItalic/RobotoItalic.woff2';
import RobotoBold from '@/assets/fonts/RobotoBold/RobotoBold.woff2';
import RobotoBoldItalic from '@/assets/fonts/RobotoBoldItalic/RobotoBoldItalic.woff2';
import RobotoMedium from '@/assets/fonts/RobotoMedium/RobotoMedium.woff2';
import RobotoMediumItalic from '@/assets/fonts/RobotoMediumItalic/RobotoMediumItalic.woff2';
import RobotoCondensedRegular from '@/assets/fonts/RobotoCondensedRegular/RobotoCondensedRegular.woff2';
import RobotoCondensedBold from '@/assets/fonts/RobotoCondensedBold/RobotoCondensedBold.woff2';

const GlobalBaseStyles = createGlobalStyle`
  /**
   * Base styles
   */
  ${({ theme: { typography } }) => css`
    html {
      font-size: ${typography.htmlFontSize}px;
    }
    body {
      margin: 0;
    }
    html,
    body,
    #root {
      height: 100%;
    }
    * {
      box-sizing: border-box;
      outline: none;
      user-select: none;
    }
  `}

  /**
   * Fonts
   */
  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoRegular}) format('woff2');
    font-style: normal;
    font-weight: 400;
  }

  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoItalic}) format('woff2');
    font-style: italic;
    font-weight: 400;
  }

  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoBold}) format('woff2');
    font-style: normal;
    font-weight: 700;
  }

  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoBoldItalic}) format('woff2');
    font-style: italic;
    font-weight: 700;
  }

  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoMedium}) format('woff2');
    font-style: normal;
    font-weight: 500;
  }

  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoMediumItalic}) format('woff2');
    font-style: italic;
    font-weight: 500;
  }

  @font-face {
    font-family: 'Roboto Condensed';
    src: url(${RobotoCondensedRegular}) format('woff2');
    font-style: normal;
    font-weight: 400;
  }

  @font-face {
    font-family: 'Roboto Condensed';
    src: url(${RobotoCondensedBold}) format('woff2');
    font-style: normal;
    font-weight: 700;
  }
`;

export default GlobalBaseStyles;
