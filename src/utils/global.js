import { app } from 'electron';
import path from 'path';
import Store from 'electron-store';

global.ROOT = path.join(__dirname, '..');
global.APPDATA_PATH = path.join(app.getPath('appData'), 'slime-electron-app-base');
global.win = null;
global.store = new Store({
  serialize: (value) => JSON.stringify(value, null, '  '),
});
