const greet = require('./greeting');
const showMessage = require('./colorful-message');
const readFileContent = require('./read-file');

console.log('=== DAILY CHALLENGE START ===\n');

console.log(greet('Anas'));
console.log(''); 

showMessage();
console.log(''); 

readFileContent();

console.log('\n=== CHALLENGE COMPLETE ===');