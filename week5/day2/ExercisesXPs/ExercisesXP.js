//===========   Exercise 1 : Giphy API  ============
const API_URL = `https://api.giphy.com/v1/gifs/search?q=hilarious&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My`;
fetch(API_URL)
.then(Response=>{
    if(!Response.ok){
        throw new Error(`HTTPS error: status ${Response.status}`);
    }return Response.json;
})
.then(data=>{
    console.log(data);
})
.catch(error=>console.error(`Error fetching data ${error}`)
);



//============  Exercise 2 : Giphy API  ===========
// Replace with your own GIPHY API key
const API_KEY = 'hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My';

// Build the search URL according to Giphy API documentation
const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=sun&limit=10&offset=2`;

// Fetch data from the Giphy API
fetch(url)
  .then(response => {
    // Check if response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // Parse response as JSON
  })
  .then(data => {
    // Log the full JavaScript object received
    console.log(data);
  })
  .catch(error => {
    // Handle any errors that occur during fetch or parsing
    console.error('Error fetching data from Giphy API:', error);
  });



  //============   Exercise 3 : Async function  ===========

async function getStarship() {
    try {
      const response = await fetch("https://www.swapi.tech/api/starships/9/");
  
      // Check if the response is successful 
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Parse JSON response
      const data = await response.json();
  
      // Log the Star Wars object data
      console.log(data.result);
    } catch (error) {
      // errors
      console.error("Error fetching Star Wars data:", error);
    }
  }
  getStarship();
  
  //============    Exercise 4: Analyze  ===========

  function resolveAfter2Seconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 2000);
    });
}

async function asyncCall() {
    console.log('calling');
    let result = await resolveAfter2Seconds();
    console.log(result);
}

asyncCall();

//calling => 2 seconds delay => resolved

