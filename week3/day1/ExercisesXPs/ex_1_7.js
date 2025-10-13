//***************************
// Exercise 1 : List of people
//***************************
//===============================================================
const people = ["Greg", "Mary", "Devon", "James"];


//Write code to remove “Greg” from the people array.
people.shift(); 
console.log(people); // ["Mary", "Devon", "James"]


//Replace "James" with "Jason":
people[people.indexOf("James")] = "Jason";
console.log(people); // ["Mary", "Devon", "Jason"]



//Write code to add your name to the end of the people array.
people.push("Anas"); 
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
    



//************************** 
//Exercise 2 : Your favorite colors
//*************************** 
//===============================================================
// 1 create array
const colors = ["blue", "red", "green", "purple", "black"];


//2 loop the array
for (let i = 0; i < colors.length; i++) {
    console.log("My #" + (i + 1) + " choice is " + colors[i]);
  }

//Bonus
const suffixes = ["st", "nd", "rd", "th", "th"];

for (let i = 0; i < colors.length; i++) {
  console.log("My " + (i + 1) + suffixes[i] + " choice is " + colors[i]);
}

  

//************************** 
//Exercise 3 : Repeat the question
//*************************** 
//===============================================================
//Prompt the user for a number.
let number = prompt("Enter a number"); 
number = Number(number); 


//While
while (number < 10) {
  number = Number(prompt("Enter a new number greater than or equal to 10"));
}


//************************** 
//Exercise 4 : Building management
//*************************** 
//===============================================================
const building = {
    numberOfFloors: 4,
    numberOfAptByFloor: {
      firstFloor: 3,
      secondFloor: 4,
      thirdFloor: 9,
      fourthFloor: 2,
    },
    nameOfTenants: ["Sarah", "Dan", "David"],
    numberOfRoomsAndRent:  {
      sarah: [3, 990],
      dan:  [4, 1000],
      david: [1, 500],
    },
  };
  
  // 1. Number of floors
  console.log(building.numberOfFloors);
  
  // 2. Apartments on floors 1 and 3
  console.log(building.numberOfAptByFloor.firstFloor); 
  console.log(building.numberOfAptByFloor.thirdFloor); 
  
  // 3. Second tenant and his rooms
  console.log(building.nameOfTenants[1]); 
  console.log(building.numberOfRoomsAndRent.dan[0]); 
  
  // 4. Rent check
  let sarahRent = building.numberOfRoomsAndRent.sarah[1];
  let davidRent = building.numberOfRoomsAndRent.david[1];
  let danRent = building.numberOfRoomsAndRent.dan[1];
  
  if (sarahRent + davidRent > danRent) {
    building.numberOfRoomsAndRent.dan[1] = 1200;
  }
  console.log(building.numberOfRoomsAndRent.dan[1]);
  

//************************** 
//Exercise 5 : Family
//***************************
//===============================================================
const family = {
    father: "Ali",
    mother: "Amina",
    child: "Sara"
  };
  
  // Keys
  for (let key in family) {
    console.log(key);
  }
  
  // Values
  for (let key in family) {
    console.log(family[key]);
  }
  


//************************** 
//Exercise 6 : Rudolf
//***************************
//===============================================================
const details = {
    my: 'name',
    is: 'Rudolf',
    the: 'reindeer'
  };
  
  let sentence = "";
  for (let key in details) {
    sentence += key + " " + details[key] + " ";
  }
  console.log(sentence.trim()); 
  
  
//************************** 
//Exercise 7 : Secret group
//***************************
//===============================================================
const names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"];

// First letters sorted
let societyName = names.map(n => n[0]).sort().join("");
console.log(societyName);
