const chalk = require('chalk');

function showMessage() {
  console.log(chalk.blueBright.bold('✨ This is your colorful Node.js message! ✨'));
  console.log(chalk.green('Success:'), chalk.greenBright('All tasks are running perfectly! ✅'));
  console.log(chalk.red('Warning:'), chalk.yellow('Don’t forget to commit your progress! 📝'));
}

module.exports = showMessage;