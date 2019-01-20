import { join } from 'path';
import configuration from './configuration';
import {
  readdirSync,
  Stats,
  lstatSync,
  readFileSync,
  mkdirSync,
  existsSync,
} from 'fs';

export default () => {
  const moduleInstallDir = join(
    configuration.GetAppDataDirectory(),
    'Installed_Modules'
  );
  try {
    console.log('Checking Installed Modules...');
    const rawInstalled = readdirSync(moduleInstallDir);
    let elegeableInstalled = [];
    if (rawInstalled.length > 0) {
      elegeableInstalled = rawInstalled
        .filter(e => {
          if (lstatSync(join(moduleInstallDir, e)).isDirectory()) {
            let currentMod = readdirSync(join(moduleInstallDir, e));
            //
            if (
              currentMod.includes('index.js') &&
              currentMod.includes('package.json') &&
              currentMod.findIndex(e => {
                if (e.includes('icon')) return e;
              }) >= 0
              // this is where we can make validations happen for modules
            ) {
              console.log('Valid Module');
              return e;
            } else {
              console.log('Invalid Module, Skipping...');
            }
          } else {
            console.log('Not a Module, Skipping...');
          }
        })
        .map(mod => {
          // Pulling out relevent information
          let packageDOTjson = JSON.parse(
            readFileSync(join(moduleInstallDir, mod, 'package.json'))
          );
          let moduleFiles = readdirSync(join(moduleInstallDir, mod));
          console.log(packageDOTjson);

          return {
            routePath: `/${mod}-${packageDOTjson.productName}-${
              packageDOTjson.version
            }`.replace(' ', '-'),
            name: packageDOTjson.productName,
            version: packageDOTjson.version,
            buildDate: packageDOTjson.buildDate,
            entryFilePath: join(moduleInstallDir, mod, 'index.js'),
            iconPath: join(
              moduleInstallDir,
              mod,
              moduleFiles[
                moduleFiles.findIndex(e => {
                  if (e.includes('icon')) return e;
                })
              ]
            ),
            bugReporting: packageDOTjson.bugs.url,
            author: packageDOTjson.author.name,
            moduleImported: [
              global.require(join(moduleInstallDir, mod, 'index.js')).default,
            ],
          };
        });
      console.log('Elegeable Installed Modules: ', elegeableInstalled);
    } else {
      console.log('Install Directory is empty.');
    }
    return elegeableInstalled;
  } catch (e) {
    console.log(
      'Install Directory does not exist. \n Creating install directory...'
    );
    mkdirSync(moduleInstallDir);
    return [];
  }
};
