//*********************** 
// // Exercise 1: Scope
// **********************
// =============================
// #1
function funcOne() {
    let a = 5;
    if (a > 1) {
        a = 3;
    }
    alert(`inside the funcOne function ${a}`); 
    // Prediction: alerts 3 because 'a' is reassigned inside the block
}
// #1.1
// funcOne(); // alerts 3

// #1.2 What if const instead of let?
// If 'a' is declared as const, then trying to reassign 'a = 3' will cause a TypeError because const variables cannot be reassigned.

// #2
let a = 0;
function funcTwo() {
    a = 5; 
    // This modifies the global variable 'a'
}
function funcThree() {
    alert(`inside the funcThree function ${a}`);
}
// #2.1
// funcThree(); // alerts 0 (initial value)
// funcTwo();   // sets a to 5
// funcThree(); // alerts 5 (updated value)

// #2.2 What if const instead of let?
// Declaring 'a' with const globally means you can't reassign it inside funcTwo().
// So funcTwo() will throw an error trying to set 'a = 5'.

// #3
function funcFour() {
    window.a = "hello"; 
    // This sets global variable 'a' on the window object
}
function funcFive() {
    alert(`inside the funcFive function ${a}`);
}
// #3.1
// funcFour(); // sets window.a = "hello"
// funcFive(); // alerts "hello" because 'a' refers to window.a

// #4
let a = 1;
function funcSix() {
    let a = "test"; 
    // This declares a new local 'a' shadowing the global one
    alert(`inside the funcSix function ${a}`);
}
// #4.1
// funcSix(); // alerts "test"
// #4.2 What if const instead of let?
// Works the same, local const 'a' shadows global 'a'. No reassignment, so no error.

// #5
let a = 2;
if (true) {
    let a = 5; 
    alert(`in the if block ${a}`); // alerts 5, block scoped 'a'
}
alert(`outside of the if block ${a}`); // alerts 2, global 'a'

// #5.2 What if const instead of let?
// Same behavior, 'const a = 5' in block is block-scoped and separate from outer 'a'.
// The alerts would still be 5 inside block and 2 outside.


// ************************
// Exercise 2 : Ternary operator
// ************************
//================================

// Transform winBattle() to arrow function
const winBattle = () => true;

// Create experiencePoints variable using ternary operator
const experiencePoints = winBattle() ? 10 : 1;
console.log(experiencePoints); // 10


//************************
//  Exercise 3 : Is it a string ?
// *************************
//=================================
const isString = (value) => typeof value === 'string';

console.log(isString('hello')); // true
console.log(isString([1, 2, 4, 0])); // false
//************************ 
// Exercise 4 : Find the sum
//************************
//=================================
const sum = (a, b) => a + b;

console.log(sum(3, 7)); // 10


//************************ 
// Exercise 5 : Kg and grams
//***********************
//==============================
// Function declaration
function kgToGrams1(kg) {
    return kg * 1000;
}
console.log(kgToGrams1(2)); // 2000

// Function expression
const kgToGrams2 = function(kg) {
    return kg * 1000;
};
console.log(kgToGrams2(3)); // 3000

// Difference (comment):
// Function declarations are hoisted and can be called before declaration,
// while function expressions are not hoisted and can only be called after definition.

// One line arrow function
const kgToGrams3 = kg => kg * 1000;
console.log(kgToGrams3(5)); // 5000


//**********************
// Exercise 6 : Fortune teller
//********************** 
//=============================
(function fortuneTeller(children, partner, location, job) {
    const message = `You will be a ${job} in ${location}, and married to ${partner} with ${children} kids.`;
    document.body.innerHTML += `<p>${message}</p>`;
})(3, 'Alice', 'Paris', 'designer');


//************************ 
// Exercise 7 : Welcome
//*********************** 
//=============================
// Assume HTML has <nav id="navbar"></nav>

(function welcomeUser(userName) {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    const div = document.createElement('div');
    div.innerHTML = `
        <span>Welcome, ${userName}!</span>
    `;
    navbar.appendChild(div);
})('John');



//************************ 
// Exercise 8 : Juice Bar
//*********************** 
//==============================
// Part I
function makeJuice(size) {
    function addIngredients(ing1, ing2, ing3) {
        const sentence = `The client wants a ${size} juice, containing ${ing1}, ${ing2}, ${ing3}.`;
        document.body.innerHTML += `<p>${sentence}</p>`;
    }
    addIngredients('apple', 'banana', 'carrot');
}
makeJuice('medium');

// Part II
function makeJuice(size) {
    let ingredients = [];
    function addIngredients(ing1, ing2, ing3) {
        ingredients.push(ing1, ing2, ing3);
    }
    function displayJuice() {
        const sentence = `The client wants a ${size} juice, containing ${ingredients.join(', ')}.`;
        document.body.innerHTML += `<p>${sentence}</p>`;
    }
    addIngredients('apple', 'banana', 'carrot');
    addIngredients('orange', 'mango', 'spinach');
    displayJuice();
}
makeJuice('large');
