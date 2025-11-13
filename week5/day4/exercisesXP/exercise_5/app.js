const _ = require('lodash');
const math = require('./math');

const nums = [10, 20, 30, 40];
const sum = _.sum(nums);
const avg = _.mean(nums);

console.log('Sum using lodash:', sum);
console.log('Average using lodash:', avg);

console.log('Custom add:', math.add(5, 10));
console.log('Custom multiply:', math.multiply(3, 4));