import { app } from 'electron';
import fs from 'fs';
import path from 'path';
import type { PackageJson } from 'types-package-json';

type PkgInfoFields = Nullable<
  Partial<
    PackageJson & {
      productName: string;
      appTitle: string;
      appId: string;
      private: boolean;
      author: {
        name: string;
      };
      repository: {
        provider: "github" | "bintray" | "s3" | "spaces" | "generic" | "custom" | "snapStore";
      };
    }
  >
>;

let pkg: PkgInfoFields = null;

const getPkg = (): PkgInfoFields => {
  try {
    const pkgPath = path.resolve(app.getAppPath(), 'package.json');
    const pkgData = fs.readFileSync(pkgPath, 'utf-8');

    pkg = JSON.parse(pkgData);

    return pkg;
  } catch (e) {
    console.error(e);

    return null;
  }
};

const getPkgInfo = (): PkgInfoFields => pkg || getPkg();

export { getPkgInfo, pkg };

