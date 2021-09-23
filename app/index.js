require("../app.asar")

const electron = require('electron');
const {dialog, BrowserWindow} = electron;

const path = require('path');
const fs = require('fs');

electron.app.on('ready', async function () {
    var win = BrowserWindow.getFocusedWindow()
    win.webContents.openDevTools();

    var dir = (await getLocalStorage(win))["sync_dir"] || String(await dialog.showOpenDialog({title: "Select the folder for syncing to and from", properties: ['openDirectory'] }));
    var fullDir = undefined;
    switch (dir) {
        case undefined:
        case "undefined":
        case "":
            dir = undefined;
            break;
        default:
            await setLocalStorage(win, "sync_dir", dir);
            fullDir = path.join(dir, "tapesync_save.json");
            break;
    }

    

    if (fs.existsSync(fullDir)) {
        var value = fs.readFileSync(fullDir, "utf8"); 
        await setLocalStorage(win, "tapedata", value);
        win.reload();
        
    }
    
    win.on('close', function() {
        getLocalStorage(win).then( e => {
            if (fs.existsSync(dir)) fs.writeFileSync(fullDir, e["tapedata"])
        })
    })
})

async function setLocalStorage(win, key, value) {
    return await win.webContents.executeJavaScript(`window.localStorage.setItem('${key}', '${fixRawString(value)}');`);
}

async function getLocalStorage(win) {
    return await win.webContents.executeJavaScript(`window.localStorage`, true);
}

function fixRawString(rawString) {
    return rawString.split("\\").join("\\\\");
}

function dialogPrint(win, message) {
    dialog.showMessageBox(win, { type: 'info', message: message, buttons: ['Yes'] });
}

