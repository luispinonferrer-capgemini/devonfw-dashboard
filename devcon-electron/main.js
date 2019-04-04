"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var environment_1 = require("./src/environments/environment");
var menu_1 = require("./menu");
var Database_1 = require("./src/electron/providers/Database");
var Devon_1 = require("./src/electron/providers/Devon");
var win, serve;
var args = process.argv.slice(1);
serve = args.some(function (val) { return val === '--serve'; });
function createWindow() {
    return __awaiter(this, void 0, void 0, function () {
        var electronScreen, size, menu, ipcHandlers;
        return __generator(this, function (_a) {
            electronScreen = electron_1.screen;
            size = electronScreen.getPrimaryDisplay().workAreaSize;
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
                webPreferences: {
                    backgroundThrottling: false,
                },
                transparent: false,
            });
            if (serve) {
                require('electron-reload')(__dirname, {
                    electron: require(__dirname + "/node_modules/electron"),
                    ignored: '**/*.sqlite',
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
            menu = electron_1.Menu.buildFromTemplate(menu_1.mainMenu);
            electron_1.Menu.setApplicationMenu(menu);
            ipcHandlers = [Database_1.default, Devon_1.default];
            ipcHandlers.forEach(function (handler) { return new handler().init(win); });
            return [2 /*return*/];
        });
    });
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