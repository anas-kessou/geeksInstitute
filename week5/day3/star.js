const apiUrl = "https://www.swapi.tech/api/people/";

async function fetchRandomCharacter() {
    document.getElementById("loading").style.display = "block"; // Show loading spinner

    try {
        // Randomly select a character ID (between 1 and 83)
        const randomId = Math.floor(Math.random() * 83) + 1;

        // Fetch character data
        const response = await fetch(`${apiUrl}${randomId}`);
        const data = await response.json();

        if (data.result) {
            const character = data.result.properties;

            // Fetch homeworld data using the homeworld URL
            const homeResponse = await fetch(character.homeworld);
            const homeData = await homeResponse.json();
            const homeWorld = homeData.result.properties;

            // Display the character and home world data
            displayCharacter(character);
            displayHomeWorld(homeWorld);
        } else {
            showError();
        }
    } catch (error) {
        showError();
    } finally {
        document.getElementById("loading").style.display = "none"; // Hide loading spinner
    }
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
