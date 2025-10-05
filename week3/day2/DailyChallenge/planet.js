// Array of planets with their number of moons and a color
const planets = [
    { name: "Mercury", color: "gray", moons: 0 },
    { name: "Venus", color: "orange", moons: 0 },
    { name: "Earth", color: "blue", moons: 1 },
    { name: "Mars", color: "red", moons: 2 },
    { name: "Jupiter", color: "brown", moons: 79 },
    { name: "Saturn", color: "goldenrod", moons: 82 },
    { name: "Uranus", color: "lightblue", moons: 27 },
    { name: "Neptune", color: "darkblue", moons: 14 }
  ];
  
  // Select the section where planets will be added
  const listPlanets = document.querySelector(".listPlanets");
  
  planets.forEach(planet => {
    // Create planet div
    const planetDiv = document.createElement("div");
    planetDiv.classList.add("planet");
    planetDiv.style.backgroundColor = planet.color;
    planetDiv.textContent = planet.name;
  
    // Create moons
    for (let i = 0; i < planet.moons; i++) {
      const moon = document.createElement("div");
      moon.classList.add("moon");
  
      // Random position around the planet
      moon.style.top = `${Math.random() * 80}px`;
      moon.style.left = `${Math.random() * 80}px`;
  
      planetDiv.appendChild(moon);
    }
  
    // Append planet to section
    listPlanets.appendChild(planetDiv);
  });
  