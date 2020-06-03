import { dialog } from 'electron';

const DEVTOOLS = 'devtools';
const APP_MAXIMIZE = 'app-maximize';
const APP_UNMAXIMIZE = 'app-unmaximize';
const APP_MINIMIZE = 'app-minimize';
const APP_CLOSE = 'app-close';
const SELECT_GAME_PATH = 'select-game-path';

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
      global.win.close();
    }
  },
  async [SELECT_GAME_PATH]() {
    try {
      const res = await dialog.showOpenDialog({
        title: '选择游戏目录',
        properties: ['openDirectory'],
      });
      if (!res.canceled) {
        [global.gamePath] = res.filePaths;
      }
      ipc.sendToClient(SELECT_GAME_PATH, true);
    } catch (err) {
      ipc.sendToClient(SELECT_GAME_PATH, false);
    }
  },
  ping() {
    ipc.sendToClient('ping', 'pong');
  },
});

export default ipcHandler;
