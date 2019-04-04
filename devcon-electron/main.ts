import { app, BrowserWindow, screen, Menu, ipcMain, ipcRenderer, shell } from 'electron';
import * as path from 'path';
import * as url from 'url';
import { AppConfig } from './src/environments/environment';
import { mainMenu } from './menu';
import * as Path from './src/common/utils/Path';
import * as fs from 'fs';
import * as targz from 'targz';
import * as http from 'http';
import { ContextPathInfo } from './src/common/utils/ContextPathInfo';
import { Workspace } from './src/modules/workspace/Workspace';
import { createConnection } from 'typeorm';
import { Item } from './src/assets/model/item.schema';
import { exec, spawn, ChildProcess, execSync } from 'child_process';
import Database from './src/electron/providers/Database';
import ipcHandler from './src/electron/providers/ipcHandler';
import Devon from './src/electron/providers/Devon';

let win, serve;
const args = process.argv.slice(1);
serve = args.some((val) => val === '--serve');

async function createWindow() {
  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  if (AppConfig.production === false) {
    mainMenu.push({
      label: 'View',
      submenu: [
        { label: 'Reload', role: 'reload' },
        { label: 'Force Reload', role: 'forcereload' },
        {
          label: 'Toggle Developpers Tools',
          role: 'toggledevtools',
        },
      ],
    });
  }

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      backgroundThrottling: false,
    },
    transparent: false,
  });

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`),
      ignored: '**/*.sqlite',
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, 'dist/index.html'),
        protocol: 'file:',
        slashes: true,
      }),
    );
  }

  win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  const menu = Menu.buildFromTemplate(mainMenu);
  Menu.setApplicationMenu(menu);

  // Set here de ipcHandlers for init
  const ipcHandlers = [Database, Devon];
  ipcHandlers.forEach(handler => new handler().init(win));
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });
} catch (e) {
  // Catch Error
  // throw e;
}