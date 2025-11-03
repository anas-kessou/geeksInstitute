const API_KEY="hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";
const form = document.getElementById("formGif");
const input = document.getElementById("searchInput");
const container = document.getElementById("gifContainer");
const deleteAllBtn = document.getElementById("deleteAll");

async function fetchRandomGif(tag) {
    const URL=  `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${tag}`;

    try {
        const responce = await fetch(URL);

        if(!responce.ok){
            throw new Error(`HTTPS error ! status: ${responce.status}`);
        }

        const data = await responce.json();
        const gifURL = data.data.images.downsized_medium.url;
        appendGif(gifURL);
    } catch (error) {
        console.error("Error fetching GIF: ",error);        
    }  
}

function appendGif(url){
    const gifDiv = document.createElement("div");
    gifDiv.classList.add("gif-item");

    const img = document.createElement("img");
    img.src = url;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent="DELETE";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", ()=>gifDiv.remove());

    gifDiv.appendChild(img);
    gifDiv.appendChild(deleteBtn);
    gifContainer.appendChild(gifDiv);
}

form.addEventListener("submit",e=>{
    e.preventDefault();
    const tag = input.value.trim();
    if (tag){
        fetchRandomGif(tag);
        input.value="";
    }
});

deleteAllBtn.addEventListener("click",()=>{
    gifContainer.innerHTML = "";
});