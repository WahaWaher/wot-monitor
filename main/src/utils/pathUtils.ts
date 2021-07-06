import path from 'path';
import isDev from 'electron-is-dev';
import { app } from 'electron';

const getAssetsPath = (subPath: string = ''): string =>
  path.resolve(app.getAppPath(), isDev ? 'assets' : 'src/ui', subPath);

export { getAssetsPath };