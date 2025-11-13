const greet = require('./greeting');

const message = greet('Anas');
console.log(message);

const showMessage = require('./colorful-message');

showMessage();

const readFileContent = require('./read-file');

readFileContent();