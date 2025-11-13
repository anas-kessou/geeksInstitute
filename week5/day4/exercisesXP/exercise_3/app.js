const { readFile, writeFile } = require('./fileManager');

const content = readFile('Hello World.txt');
console.log('File content:', content);

writeFile('Bye World.txt', 'Writing to the file');
console.log('Successfully wrote to Bye World.txt');