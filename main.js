"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var environment_1 = require("./src/environments/environment");
var menu_1 = require("./menu");
var Database_1 = require("./src/electron/providers/Database");
var Devon_1 = require("./src/electron/providers/Devon");
var Docs_1 = require("./src/electron/providers/Docs");
var win, serve;
var args = process.argv.slice(1);
serve = args.some(function (val) { return val === '--serve'; });
function createWindow() {
    var electronScreen = electron_1.screen;
    var size = electronScreen.getPrimaryDisplay().workAreaSize;
    if (environment_1.AppConfig.production === false) {
        menu_1.mainMenu.push({
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
    win = new electron_1.BrowserWindow({
        x: 0,
        y: 0,
        width: size.width,
        height: size.height,
    });
    if (serve) {
        require('electron-reload')(__dirname, {
            electron: require(__dirname + "/node_modules/electron"),
        });
        win.loadURL('http://localhost:4200');
    }
    else {
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'dist/index.html'),
            protocol: 'file:',
            slashes: true,
        }));
    }
    win.webContents.openDevTools();
    // Emitted when the window is closed.
    win.on('closed', function () {
        // Dereference the window object, usually you would store window
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
    var menu = electron_1.Menu.buildFromTemplate(menu_1.mainMenu);
    electron_1.Menu.setApplicationMenu(menu);
    // Set here de ipcHandlers for init
    var ipcHandlers = [Database_1.default, Devon_1.default, Docs_1.default];
    ipcHandlers.forEach(function (handler) { return new handler().init(win); });
}
try {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    electron_1.app.on('ready', createWindow);
    // Quit when all windows are closed.
    electron_1.app.on('window-all-closed', function () {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    });
    electron_1.app.on('activate', function () {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
            createWindow();
        }
    });
}
catch (e) {
    // Catch Error
    // throw e;
}
//# sourceMappingURL=main.js.map