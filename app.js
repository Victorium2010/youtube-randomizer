const API_KEY = "AIzaSyAPCkiqKnclLLTows-QJvPWEnvFC3_g0dM";
let channels = JSON.parse(localStorage.getItem("channels")) || [];
let watched = JSON.parse(localStorage.getItem("watched")) || [];

function addChannel(){

    let input = document.getElementById("channelInput").value;

    if(input){

        channels.push(input);

        localStorage.setItem(
            "channels",
            JSON.stringify(channels)
        );

        document.getElementById("channelInput").value = "";

        showChannels();
    }
}


function showChannels(){

    let box = document.getElementById("channels");

    box.innerHTML = "";

    channels.forEach(channel => {

        box.innerHTML += `
        <p>📺 ${channel}</p>
        `;

    });

}


async function randomVideo(){

    let result = document.getElementById("result");

    if(channels.length === 0){
        result.innerHTML = "Añade primero un canal";
        return;
    }

    result.innerHTML = "⏳ Buscando vídeos...";

    let videos = [];

    for(let channel of channels){

        let username = channel.split("@")[1];

        let response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&channelId=${username}&maxResults=10&order=date`
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

    let id = video.id.videoId;

    result.innerHTML = `
    <h3>${video.snippet.title}</h3>
    <iframe width="560" height="315"
    src="https://www.youtube.com/embed/${id}"
    allowfullscreen>
    </iframe>
    `;
}


showChannels();
