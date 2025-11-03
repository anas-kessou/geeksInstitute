const apiUrl = "https://www.swapi.tech/api/people/";

function fetchRandomCharacter() {
    document.getElementById("loading").style.display = "block"; 
    // Randomly select a character ID (between 1 and 83)
    const randomId = Math.floor(Math.random() * 83) + 1;

    // Fetch character data
    fetch(`${apiUrl}${randomId}`)
        .then(response => response.json())
        .then(data => {
            if (data.result) {
                const character = data.result.properties;

                // Fetch homeworld data
                fetch(character.homeworld)
                    .then(response => response.json())
                    .then(homeData => {
                        const homeWorld = homeData.result.properties;
                        displayCharacter(character);
                        displayHomeWorld(homeWorld);
                    })
                    .catch(() => showError()); 
            } else {
                showError(); 
            }
        })
        .catch(() => showError()) 
        .finally(() => document.getElementById("loading").style.display = "none"); 
}

function displayCharacter(character) {
    document.getElementById("name").textContent = `Name: ${character.name}`;
    document.getElementById("height").textContent = `Height: ${character.height}`;
    document.getElementById("gender").textContent = `Gender: ${character.gender}`;
    document.getElementById("birth-year").textContent = `Birth Year: ${character.birth_year}`;
}

function displayHomeWorld(homeWorld) {
    document.getElementById("home-world").textContent = `Home World: ${homeWorld.name}`;
}

function showError() {
    document.getElementById("name").textContent = "Oh No! That person isn't available.";
    document.getElementById("height").textContent = "";
    document.getElementById("gender").textContent = "";
    document.getElementById("birth-year").textContent = "";
    document.getElementById("home-world").textContent = "";
}
