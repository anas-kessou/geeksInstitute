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

  