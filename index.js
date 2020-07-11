const asar = require('asar');
const path = require('path');
const fs = require('fs');

const src = (path.join(require('os').homedir(), "AppData", "Local", "Programs", "Tape", "resources", "app.asar"));
const dest = (path.join(require('os').homedir(), "AppData", "Local", "Programs", "Tape", "resources", "app"));
 
extract().then(e => {
    
})

async function extract() {
    await asar.extractAll(src, dest);
    console.log('done.');
    return;
}
