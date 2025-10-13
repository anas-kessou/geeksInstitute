//************************** 
//Exercise 1 : Division
//*************************** 
//===============================================================
 
function displayNumbersDivisible(){
    let sum=0
    for (let i =0 ; i<=500 ; i++){
        if (i%23==0){
            console.log(i)
            sum+=i
        }
    }console.log("sum:" ,sum)
}

//Bonu
function displayNumbersDivisible(num){
    let sum=0
    for (let i =0 ; i<=500 ; i++){
        if (i%num==0){
            console.log(i)
            sum+=i
        }
    }console.log("sum:" ,sum)
}



//************************** 
//Exercise 2 : Shopping List
//*************************** 
//===============================================================
const stock = { 
    "banana": 6, 
    "apple": 0,
    "pear": 12,
    "orange": 32,
    "blueberry":1
}  

const prices = {    
    "banana": 4, 
    "apple": 2, 
    "pear": 1,
    "orange": 1.5,
    "blueberry":10
} 

const shoppingList=["banana","orange","apple"]

function myBill(){
    let total=0
    for (let item of shoppingList){
       if (item in stock){
        total+= prices[item]
        stock[item]--
       }
    }
    return total
}
console.log(myBill())
console.log(stock)


//************************** 
//Exercise 3 : Wallet
//*************************** 
//===============================================================

function changeEnough(itemPrice, amountOfChange){
    if (itemPrice <= 0.25*amountOfChange[0]+0.10*amountOfChange[1]+0.05*amountOfChange[2]+0.01*amountOfChange[3]){
     return true
    }else{
     return false
    }
}

console.log(changeEnough(6.75, [25, 20, 5, 0]))


//************************** 
//Exercise 4 : VacationCost
//*************************** 
//===============================================================

function hotelCost(nights) {
    const pricePerNight = 140;
    return nights * pricePerNight;
}

function planeRideCost(destination) {
    destination = destination.toLowerCase();
    if (destination === "london") {
        return 183;
    } else if (destination === "paris") {
        return 220;
    } else {
        return 300;
    }
}

function rentalCarCost(days) {
    const dailyRate = 40;
    let total = days * dailyRate;
    if (days > 10) {
        total *= 0.95; // 5% discount
    }
    return total;
}

function totalVacationCost() {
    let nights;
    while (true) {
        nights = prompt("How many nights will you stay in the hotel?");
        if (nights !== null && !isNaN(nights) && Number(nights) >= 0) {
            nights = Number(nights);
            break;
        }
        alert("Please enter a valid number of nights.");
    }

    let days;
    while (true) {
        days = prompt("How many days will you rent a car?");
        if (days !== null && !isNaN(days) && Number(days) >= 0) {
            days = Number(days);
            break;
        }
        alert("Please enter a valid number of days.");
    }

    let destination;
    while (true) {
        destination = prompt("What is your destination?");
        if (destination && isNaN(destination)) {
            break;
        }
        alert("Please enter a valid destination.");
    }

    const hotel = hotelCost(nights);
    const plane = planeRideCost(destination);
    const car = rentalCarCost(days);

    const total = hotel + plane + car;

    alert(
        `The car cost: $${car.toFixed(2)}\n` +
        `The hotel cost: $${hotel.toFixed(2)}\n` +
        `The plane tickets cost: $${plane.toFixed(2)}\n` +
        `Total vacation cost: $${total.toFixed(2)}`
    );
}

// Call the function to run the program
totalVacationCost();





