//Exercise 1 : Comparison
function compareToTen(num){
    return new Promise((resolve,reject)=>{
        if(num<=10){
            resolve(`${num} is less then 10`);
        }else{
            reject(`${num} greater then 10`);
        }
    })
}
//In the example, the promise should reject
compareToTen(15)
  .then(result => console.log(result))
  .catch(error => console.log(error))

//In the example, the promise should resolve
compareToTen(8)
  .then(result => console.log(result))
  .catch(error => console.log(error))

//Exercise 2 : Promises

const success = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve("Success!");
    },4000);
});
success.then(result=>console.log(result));

//Exercise 4: quizz - not mandatory
