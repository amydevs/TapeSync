var fs = require("fs-extra");
var path = require('path')
var readline = require('readline');

var src = "./app"
var dest = (path.join(require('os').homedir(), "AppData", "Local", "Programs", "Tape", "resources", "app"));

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
console.log(dest)
rl.question('Type 1 for INSTALL, and 2 for UNINSTALL: ', (answer) => { 
    rl.close();
    if (answer == "1") {
        fs.copySync(src, dest);
    }
    else if (answer == "2") 
    {
        fs.removeSync(dest);
    }
});

