function changeEnough(itemPrice, amountOfChange){
    if (itemPrice <= 0.25*amountOfChange[0]+0.10*amountOfChange[1]+0.05*amountOfChange[2]+0.01*amountOfChange[3]){
     return true
    }else{
     return false
    }
}

console.log(changeEnough(6.75, [25, 20, 5, 0]))