//===================  Ex_1  =================================
function makeAllCaps(words){
    return new Promise((resolve,reject)=>{
        if (words.every(word=> typeof word==="string")){
            const uppercaseWords=words.map(word=> word.toUpperCase());
            resolve(uppercaseWords);
        }else{
            reject('error, not all element are strings!');
        }
    });
}

function sortWords(words){
    return new Promise((resolve,reject)=>{
        if(words.length>4){
            const sortedWords = [...words].sort();
            resolve(sortedWords);
        }else{
            reject('Error: words are more than 4');
        }
    });
}

//in this example, the catch method is executed, because the array contains a number
makeAllCaps([1, "pear", "banana"])
      .then((arr) => sortWords(arr))
      .then((result) => console.log(result))
      .catch(error => console.log(error))

//in this example, the catch method is executed, because the array length is not bigger than 4
makeAllCaps(["apple", "pear", "banana"])
      .then((arr) => sortWords(arr))
      .then((result) => console.log(result))
      .catch(error => console.log(error))

//in this example, you should see in the console, 
// the array of words uppercased and sorted
makeAllCaps(["apple", "pear", "banana", "melon", "kiwi"])
      .then((arr) => sortWords(arr))
      .then((result) => console.log(result)) //["APPLE","BANANA", "KIWI", "MELON", "PEAR"]
      .catch(error => console.log(error))



//===================  Ex_2  =================================
const morse = `{
    "0": "-----",
    "1": ".----",
    "2": "..---",
    "3": "...--",
    "4": "....-",
    "5": ".....",
    "6": "-....",
    "7": "--...",
    "8": "---..",
    "9": "----.",
    "a": ".-",
    "b": "-...",
    "c": "-.-.",
    "d": "-..",
    "e": ".",
    "f": "..-.",
    "g": "--.",
    "h": "....",
    "i": "..",
    "j": ".---",
    "k": "-.-",
    "l": ".-..",
    "m": "--",
    "n": "-.",
    "o": "---",
    "p": ".--.",
    "q": "--.-",
    "r": ".-.",
    "s": "...",
    "t": "-",
    "u": "..-",
    "v": "...-",
    "w": ".--",
    "x": "-..-",
    "y": "-.--",
    "z": "--..",
    ".": ".-.-.-",
    ",": "--..--",
    "?": "..--..",
    "!": "-.-.--",
    "-": "-....-",
    "/": "-..-.",
    "@": ".--.-.",
    "(": "-.--.",
    ")": "-.--.-"
  }`
  
//first function
function toJs(){
    return new Promise((resolve,reject)=>{
        const morseJS = JSON.parse(morse);
        if (Object.keys(morseJS).length === 0){
            reject('Error: morse object is empty');
        }else{
            resolve(morseJS);
        }
    });
}
//second function
function toMorse(morseJS){
    return new Promise((resolve,reject)=>{
        const userInput = prompt('enter a word or santence: ').toLowerCase();
        const morseTranslation = [];
        for (const char of userInput){
            if (morseJS[char]){
                morseTranslation.push(morseJS[char]);
            }else{
                reject('Error: character "${char}" connot be translated to morse!');
                return;
            }
        }
        resolve(morseTranslation);
    });
}

//third function
function joinWords(morseTranslation){
    const joined = morseTranslation.join("\n");
    return joined;
}

toJs()
.then(morseJS=>toMorse(morseJS))
.then(morseTranslation=>joinWords(morseTranslation))
.catch(error=>console.error(error));