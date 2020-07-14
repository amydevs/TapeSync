var path = require('path');
var readline = require('readline');

var src = (path.join(require('os').homedir(), "AppData", "Local", "Programs", "Tape", "resources", "app.asar"));
var dest = (path.join(require('os').homedir(), "AppData", "Local", "Programs", "Tape", "resources", "app"));

const INSTALL = require('./js/install');
const UNINSTALL = require('./js/uninstall');
var install = new INSTALL();
var uninstall = new UNINSTALL();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('Type 1 for INSTALL, and 2 for UNINSTALL: ', (answer) => { 
    rl.close();
    if (answer == "1") install.installPrompt(src, dest)
    else if (answer == "2") uninstall.uninstallPrompt(src, dest)
});

