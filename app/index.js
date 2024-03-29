require("../app.asar")

const electron = require('electron');
const {dialog, BrowserWindow} = electron;

const path = require('path');
const fs = require('fs');
electron.app.on('ready', async function () {
    var win = BrowserWindow.getFocusedWindow()

    // Set Sync Dir
    var dir = (await getLocalStorage(win))["sync_dir"] || await getDirectoryFromUI();
    var fullDir = undefined;
    switch (dir) {
        case undefined:
        case "undefined":
        case "":
            dir = undefined;
            break;
        default:
            await setLocalStorage(win, "sync_dir", dir);
            fullDir = path.join(dir, "tapesync_save.txt");
            break;
    }
    
    win.webContents.on('before-input-event', async (event, input) => {
        if (input.control && input.key.toLowerCase() === 'r') {
            dir = await getDirectoryFromUI();
            await setLocalStorage(win, "sync_dir", dir);
            event.preventDefault()
        }
    })

    // Load Sync File if Exists
    if (fs.existsSync(fullDir)) {
        var value = fs.readFileSync(fullDir, "utf8"); 
        await setLocalStorage(win, "tapedata", JSON.stringify(JSON.parse(value)));
        win.reload();
        
    }
    
    // Save Sync File
    win.on('close', function() {
        getLocalStorage(win).then( e => {
            var data = e["tapedata"];
            if (fs.existsSync(dir) && data != undefined && data != "undefined") fs.writeFileSync(fullDir, JSON.stringify(JSON.parse(data), null, "\t"))
        })
    })
})

async function getDirectoryFromUI() {
    return String(await dialog.showOpenDialog({title: "Please select your folder for syncing (Google Drive, OneDrive, iCloud, etc.):", properties: ['openDirectory'] }))
}

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
