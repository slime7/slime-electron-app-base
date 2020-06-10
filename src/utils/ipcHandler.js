const DEVTOOLS = 'devtools';
const APP_MAXIMIZE = 'app-maximize';
const APP_UNMAXIMIZE = 'app-unmaximize';
const APP_MINIMIZE = 'app-minimize';
const APP_CLOSE = 'app-close';

const ipcHandler = (ipc) => ({
  [DEVTOOLS]() {
    if (global.win) {
      global.win.webContents.openDevTools();
    }
  },
  [APP_MAXIMIZE]() {
    if (global.win) {
      global.win.maximize();
    }
  },
  [APP_UNMAXIMIZE]() {
    if (global.win) {
      global.win.unmaximize();
    }
  },
  [APP_MINIMIZE]() {
    if (global.win) {
      global.win.minimize();
    }
  },
  [APP_CLOSE]() {
    if (global.win) {
      global.win.webContents.closeDevTools();
      global.win.close();
    }
  },
  ping() {
    ipc.sendToClient('ping', 'pong');
  },
});

export default ipcHandler;
