let client = "John";

const groceries = {
    fruits: ["pear", "apple", "banana"],
    vegetables: ["tomatoes", "cucumber", "salad"],
    totalPrice: "20$",
    other: {
        paid: true,
        meansOfPayment: ["cash", "creditCard"]
    }
}

// 1. Arrow function that logs the fruits using forEach
const displayGroceries = () => {
    groceries.fruits.forEach(fruit => console.log(fruit));
};

// 2. Arrow function cloneGroceries
const cloneGroceries = () => {
    // user is a copy of client (primitive string)
    let user = client;

    // Change client
    client = "Betty";

    console.log("client:", client); // Betty
    console.log("user:", user);     // John

    
    // user is NOT affected by change to client because strings are primitive and copied by value

    // shopping is assigned the groceries object (reference)
    let shopping = groceries;

    // Change totalPrice key
    shopping.totalPrice = "35$";

    // Will groceries.totalPrice change?
    console.log("groceries.totalPrice:", groceries.totalPrice); // 35$

   
    // shopping and groceries point to the SAME object in memory (pass by reference),
    // so changes in shopping affect groceries.

    // Change paid key inside nested object
    shopping.other.paid = false;

    // Check groceries.other.paid
    console.log("groceries.other.paid:", groceries.other.paid); // false

   
    // other is an object nested inside groceries, so changing paid via shopping affects groceries.other.paid

};

// Running time
displayGroceries();
cloneGroceries();
