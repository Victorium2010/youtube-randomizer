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


function randomVideo(){

    document.getElementById("result").innerHTML =
    "⏳ Preparando el selector de vídeos...";

}


showChannels();