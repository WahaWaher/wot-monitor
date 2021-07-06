import {} from 'styled-components';
import { ThemeConfigType } from './index';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeConfigType {}
}
