const people = ["Greg", "Mary", "Devon", "James"];


//Write code to remove “Greg” from the people array.
people.shift(); 
console.log(people); // ["Mary", "Devon", "James"]


//Replace "James" with "Jason":
people[people.indexOf("James")] = "Jason";
console.log(people); // ["Mary", "Devon", "Jason"]



//Write code to add your name to the end of the people array.
people.push("Anas"); // use your name
console.log(people); // ["Mary", "Devon", "Jason", "Anas"]



//Write code that console.logs Mary’s index. take a look at the indexOf method on Google.
console.log(people.indexOf("Mary")); // 0


//Write code to make a copy of the people array using the slice method.
const copy = people.slice(1, people.length - 1);
console.log(copy); // ["Devon", "Jason"]


//Write code that gives the index of “Foo”. Why does it return -1 ?
console.log(people.indexOf("Foo")); // -1
// -1 means "not found"

//Create a variable called last which value is the last element of the array.
let last = people[people.length - 1];
console.log(last); // "Anas"


//Part II – Loops
//loop people
for (let person of people) {
    console.log(person);
  }
//Stop after "Devon":
for (let person of people) {
    console.log(person);
    if (person === "Devon") break;
  }
    