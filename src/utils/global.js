import { app } from 'electron';
import path from 'path';
import Store from 'electron-store';
import pkg from '../../package.json';

const appName = pkg.name;
global.ROOT = path.join(__dirname, '..');
global.APPDATA_PATH = path.join(app.getPath('appData'), appName);
global.win = null;
global.store = new Store({
  serialize: (value) => JSON.stringify(value, null, '  '),
});
