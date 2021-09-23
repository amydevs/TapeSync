require("../app.asar")

const electron = require('electron');
const {dialog, BrowserWindow} = electron;

const path = require('path');
const fs = require('fs');

electron.app.on('ready', async function () {
    var win = BrowserWindow.getFocusedWindow()
    win.webContents.openDevTools();
    
    var dir = (await getLocalStorage(win))["sync_dir"] || String(await dialog.showOpenDialog({title: "Select the folder for syncing to and from", properties: ['openDirectory'] }));
    switch (dir) {
        case undefined:
        case "undefined":
        case "":
            dir = undefined;
            break;
        default:
            await setLocalStorage(win, "sync_dir", dir);
            break;
    }

    win.on('close', async function() {
        if (fs.existsSync(dir)) {
            fs.writeFile(path.join(dir, "tapesync_save.json"), fixRawString((await getLocalStorage(win))["tapedata"]))
        }
    })
})

async function setLocalStorage(win, key, value) {
    return await win.webContents.executeJavaScript(`window.localStorage["${key}"] = "${fixRawString(value)}"`);
}

async function getLocalStorage(win) {
    return await win.webContents.executeJavaScript(`window.localStorage`, true);
}

function fixRawString(rawString) {
    return rawString.split("\\").join("\\\\");
}


