const asar = require('asar');
const path = require('path');
 
const src = (path.joi);
const dest = 'name.asar';
 
await asar.extractAll(src, dest);
console.log('done.');