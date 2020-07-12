const asar = require('asar');
const path = require('path');
const fs = require('fs');
const replace = require('replace-in-file');

const src = (path.join(require('os').homedir(), "AppData", "Local", "Programs", "Tape", "resources", "app.asar"));
const dest = (path.join(require('os').homedir(), "AppData", "Local", "Programs", "Tape", "resources", "app"));
 
extract().then(async function() {
    var fileData0 = fs.readFileSync("replacement0.txt", "utf8");
    var fileData1 = fs.readFileSync("replacement1.txt", "utf8");

    try {
        await replace({
            files: path.join(dest, "app", "app.js"),
            from: "function updateSaveData() {",
            to: fileData1,
        })
        await replace({
            files: path.join(dest, "app", "app.js"),
            from: "var allowTyping = true;",
            to: fileData0,
        })
    }
        catch (error) {
        console.error('Error occurred:', error);
    }
    return;
}).then( function() {
    fs.rename(src, path.join(require('os').homedir(), "AppData", "Local", "Programs", "Tape", "resources", "app.asar.bak"), function(err) {
        if ( err ) console.log('ERROR: ' + err);
    });
})


async function extract() {
    await asar.extractAll(src, dest);
    console.log('done.');
    return;
}
