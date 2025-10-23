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
