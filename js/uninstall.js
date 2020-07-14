var rimraf = require("rimraf");
var fs = require('fs');
var path = require('path');

class UNINSTALL {
    constructor() {}
    uninstallPrompt(src, dest) {
        rimraf(dest, function () { console.log("App Folder Deletion Completed"); });
        fs.rename(path.join(require('os').homedir(), "AppData", "Local", "Programs", "Tape", "resources", "app.asar.bak"), src, function(err) {
            if (err) console.error('Backup rename error: ', err);
            else console.log('Renamed ASAR to Original');
        });
    }
}
  
module.exports = UNINSTALL;
  