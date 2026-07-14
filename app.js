const API_KEY = "AIzaSyAPCkiqKnclLLTows-QJvPWEnvFC3_g0dM";

let channels = JSON.parse(localStorage.getItem("channels")) || [];


function saveChannels(){
    localStorage.setItem("channels", JSON.stringify(channels));
}


// Añadir canal buscando por nombre o enlace
async function addChannel(){

    let input = document.getElementById("channelInput").value.trim();

    if(!input){
        return;
    }

    // Si es un enlace con @, sacamos el nombre
    let query = input;

    if(input.includes("@")){
        query = input.split("@")[1];
    }

    try{

        let response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&type=channel&q=${encodeURIComponent(query)}`
        );

        let data = await response.json();


        if(data.items && data.items.length > 0){

            let channelId = data.items[0].id.channelId;

            if(!channels.includes(channelId)){

                channels.push(channelId);
                saveChannels();

            }


            document.getElementById("channelInput").value = "";

            showChannels();

            alert("✅ Canal añadido");


        }else{

            alert("❌ No se encontró el canal");

        }


    }catch(error){

        console.log(error);
        alert("Error conectando con YouTube");

    }

}



// Mostrar canales guardados
function showChannels(){

    let box = document.getElementById("channels");

    box.innerHTML = "";


    channels.forEach((channel,index)=>{

        box.innerHTML += `
        <p>
        📺 Canal guardado ${index+1}
        </p>
        `;

    });

}



// Elegir vídeo aleatorio
async function randomVideo(){

    let result = document.getElementById("result");


    if(channels.length === 0){

        result.innerHTML = "Añade primero un canal";
        return;

    }


    result.innerHTML = "⏳ Buscando vídeos...";


    let videos = [];


    for(let channel of channels){


        let response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&type=video&channelId=${channel}&maxResults=50`
        );


        let data = await response.json();


        if(data.items){

            videos.push(...data.items);

        }


    }



    if(videos.length === 0){

        result.innerHTML = "No se encontraron vídeos";
        return;

    }



    let video = videos[Math.floor(Math.random()*videos.length)];



    result.innerHTML = `

    <h3>${video.snippet.title}</h3>

    <iframe width="100%" height="315"
    src="https://www.youtube.com/embed/${video.id.videoId}"
    allowfullscreen>
    </iframe>

    `;


}



showChannels();
