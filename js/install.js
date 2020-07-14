var asar = require('asar');
var path = require('path');
var fs = require('fs');
var readline = require('readline');
var replace = require('replace-in-file');

class INSTALL {
    installPrompt(src, dest) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        if (fs.existsSync(path.join(require('os').homedir(), "Google Drive"))) {
            console.log("Found Google Drive! Type `gdrive` for to use this service for synchronisation.")
        }
        if (fs.existsSync(path.join(require('os').homedir(), "OneDrive"))) {
            console.log("Found OneDrive! Type `onedrive` for to use this service for synchronisation.")
        }
        console.log("To use a custom directory, type `custom`.")
        
          
        rl.question('Select a synchronisation service: ', (answer) => {
            rl.close();
            var directory;
            if (answer == 'gdrive') {directory = "require('os').homedir(), 'Google Drive'"; confirmed(directory)}
            else if (answer == 'onedrive') {directory = "require('os').homedir(), 'OneDrive'"; confirmed(directory)}
            else if (answer == 'custom') {
                var directory = readline.createInterface({input: process.stdin, output: process.stdout})
                .question('Type the directory in here (or drag and drop the folder into this window): ', (answer) => {confirmed('"'+(answer).split('\\').join('", "')+'"'); rl.close();})
            }
        });
        function confirmed(directory) {
            var replacement0 = 
            '    var allowTyping = true;\r\n' +    
            '    //Start of something new!\r\n' +
            "    var path = require('path');\r\n" +
            `    fs.readFile(path.join(`+directory+`, "tape_save.txt"), "utf8", function read(err, data) {\r\n` +
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

            var replacement1 = 
            'function updateSaveData() {\r\n' +
            '    //Start of something new!\r\n' +
            "    var path = require('path');\r\n" +
            '    var exportdb = JSON.stringify(data, null, "\\t");\r\n' +
            `    var stream_1 = fs.createWriteStream(path.join(`+directory+`, "tape_save.txt"))\r\n` +
            "    stream_1.once('open', function () {\r\n" +
            '        stream_1.write(exportdb);\r\n' +
            '        stream_1.end();\r\n' +
            '    });\r\n' +
            '    //End of something new!'

            var extraction = new INSTALL;
            extraction.extract(src, dest).then(async function() {
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
                    console.log('JS Modification Finished.');
                }
                    catch (err) {
                    console.error('JS modification error:', err);
                }
                return;
            }).then( function() {
                var rename = path.join(require('os').homedir(), "AppData", "Local", "Programs", "Tape", "resources", "app.asar.bak")
                fs.rename(src, rename, function(err) {
                    if (err) console.error('Backup rename error: ', err);
                    else console.log('Renamed original contents to backup file: ' + rename);
                    console.log('Done! It is now safe to close this window if it is still open.')
                });
            })
            return;
        }
    }

    async extract(src, dest) {
        await asar.extractAll(src, dest);
        console.log('Extraction Finished.');
        return;
    }
}
  
module.exports = INSTALL;
  