const names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"];

// First letters sorted
let societyName = names.map(n => n[0]).sort().join("");
console.log(societyName);
