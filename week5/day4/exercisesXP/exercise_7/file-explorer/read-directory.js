const fs = require('fs');

const files = fs.readdirSync('.');
console.log('Files in this directory:');
files.forEach(f => console.log(f));  