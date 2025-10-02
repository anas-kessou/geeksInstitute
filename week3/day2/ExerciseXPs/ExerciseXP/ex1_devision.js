//create function 
function displayNumbersDivisible(){
    let sum=0
    for (let i =0 ; i<=500 ; i++){
        if (i%23==0){
            console.log(i)
            sum+=i
        }
    }console.log("sum:" ,sum)
}

//Bonus
//create function 
function displayNumbersDivisible(num){
    let sum=0
    for (let i =0 ; i<=500 ; i++){
        if (i%num==0){
            console.log(i)
            sum+=i
        }
    }console.log("sum:" ,sum)
}
