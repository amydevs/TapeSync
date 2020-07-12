const asar = require('asar');
const path = require('path');
const fs = require('fs');
const replace = require('replace-in-file');

const src = (path.join(require('os').homedir(), "AppData", "Local", "Programs", "Tape", "resources", "app.asar"));
const dest = (path.join(require('os').homedir(), "AppData", "Local", "Programs", "Tape", "resources", "app"));
 
extract().then(async function() {
    try {
        await replace({
            files: path.join(dest, "app", "app.js"),
            from: "function updateSaveData() {",
            to: replacement1,
        })
        await replace({
            files: path.join(dest, "app", "app.js"),
            from: "var allowTyping = true;",
            to: replacement0,
        })
    }
        catch (error) {
        console.error('JS modification error:', error);
    }
    return;
}).then( function() {
    fs.rename(src, path.join(require('os').homedir(), "AppData", "Local", "Programs", "Tape", "resources", "app.asar.bak"), function(err) {
        if (error) console.error('Extraction Error: ', err);
    });
})


async function extract() {
    await asar.extractAll(src, dest);
    console.log('done.');
    return;
}

const replacement0 = 
'    var allowTyping = true;\r\n' +    
'    //Start of something new!\r\n' +
"    var path = require('path');\r\n" +
`    fs.readFile(path.join(require('os').homedir(), "Google Drive", "tape_save.txt"), "utf8", function read(err, data) {\r\n` +
'        if (!err) {\r\n' +
'            const content = data;\r\n' +
"            localStorage.setItem('tapedata', content)\r\n" +
"            if(sessionStorage.getItem('tempCounter') == null){\r\n" +
"                sessionStorage.setItem('tempCounter', 0)\r\n" +
"                var remote = require('electron').remote;\r\n" +
'                remote.getCurrentWindow().reload();\r\n' +
'            }\r\n' +
'        }\r\n' +
'    });\r\n' +
'    //End of something new!'

const replacement1 = 
'function updateSaveData() {\r\n' +
    '    //Start of something new!\r\n' +
    "    var path = require('path');\r\n" +
    '    var exportdb = JSON.stringify(data, null, "\\t");\r\n' +
    `    var stream_1 = fs.createWriteStream(path.join(require('os').homedir(), "Google Drive", "tape_save.txt"));\r\n` +
    "    stream_1.once('open', function () {\r\n" +
    '        stream_1.write(exportdb);\r\n' +
    '        stream_1.end();\r\n' +
    '    });\r\n' +
    '    //End of something new!'
