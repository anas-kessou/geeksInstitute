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
  