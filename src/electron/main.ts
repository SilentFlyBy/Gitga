import * as electron from "electron";
import * as path from "path";
import * as url from "url";
import { BrowserWindow, dialog } from "electron";
import GitgaMenu from "./menu";

const app = electron.app;
const browserWindow = electron.BrowserWindow;

const icon = path.join(__dirname, "../browser/resources/img/gitga-icon.png");

let mainWindow: BrowserWindow;

app.commandLine.appendSwitch("remote-debugging-port", "9222");
app.on("ready", createWindow);
app.on("window-all-closed", () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

const menu: GitgaMenu = new GitgaMenu(openRepository);
menu.buildMenu();

function createWindow() {
    mainWindow = new BrowserWindow({ width: 1200, height: 800, icon });

    const indexURL = `file://${app.getAppPath()}/index.html`;
    mainWindow.loadURL(indexURL);

    mainWindow.on("closed", () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}

function openRepository() {
    const repoPath = dialog.showOpenDialog({properties: ["openDirectory"]});

    if (repoPath && repoPath.length) {
      sendEvent("openRepository", repoPath[0]);
    }
  }

function sendEvent(eventName: string, eventObject: any) {
    mainWindow.webContents.send(eventName, eventObject);
}
