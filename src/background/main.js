import {
  BrowserWindow,
  ipcMain,
  screen,
} from 'electron';
import {
  createProtocol,
} from 'vue-cli-plugin-electron-builder/lib';
import '../utils/global';
import Ipc from './Ipc';

export default () => {
  const { workArea } = screen.getPrimaryDisplay();
  const defaultWin = {
    x: workArea.width / 2 - 200,
    y: workArea.height / 2 - 300,
    width: 900,
    height: 600,
    maximize: false,
  };
  if (defaultWin.y < 0) {
    defaultWin.y = 0;
  }
  let {
    x,
    y,
    width,
    height,
    maximize,
  } = global.store.get('window', defaultWin);
  maximize = false;
  // Create the browser window.
  global.win = new BrowserWindow({
    x,
    y,
    width,
    height,
    frame: false,
    minWidth: 400,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See https://github.com/nklayman/vue-cli-plugin-electron-builder/blob/v2/docs/guide/configuration.md#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
    },
  });
  const ipc = new Ipc(ipcMain, global.win.webContents);

  global.win.on('maximize', () => {
    maximize = true;
    ipc.sendToClient('set-maximize-status', true);
  });

  global.win.on('unmaximize', () => {
    maximize = false;
    ipc.sendToClient('set-maximize-status', false);
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    global.win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) global.win.webContents.openDevTools({ mode: 'undocked' });
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    global.win.loadURL('app://./index.html');
  }

  global.win.on('close', () => {
    if (!maximize) {
      const pos = global.win.getPosition();
      const size = global.win.getSize();
      [x, y, width, height] = [...pos, ...size];
    }
    global.store.set('window', {
      x,
      y,
      width,
      height,
      maximize,
    });
  });

  global.win.on('closed', () => {
    global.win = null;
  });
};
