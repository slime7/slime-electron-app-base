import {
  DEVTOOLS,
  APP_MAXIMIZE,
  APP_UNMAXIMIZE,
  APP_MINIMIZE,
  APP_CLOSE,
  APP_VERSIONS,
} from '@/utils/ipcConstant';
import pkg from '../../package.json';

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
  [APP_VERSIONS]() {
    const versions = {
      app: pkg.version,
      electron: process.versions.electron,
      chrome: process.versions.chrome,
      v8: process.versions.v8,
      node: process.versions.node,
    };
    ipc.sendToClient(APP_VERSIONS, versions);
  },
  ping() {
    ipc.sendToClient('ping', 'pong');
  },
});

export default ipcHandler;
