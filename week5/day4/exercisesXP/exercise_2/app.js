import { people } from './data.js';

function calculateAverageAge(persons) {
  const totalAge = persons.reduce((sum, p) => sum + p.age, 0);
  const average = totalAge / persons.length;
  console.log(`Average age: ${average.toFixed(1)}`);
}

calculateAverageAge(people);