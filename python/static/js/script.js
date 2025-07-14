// Display Preview Image
document.getElementById("fileSelector").addEventListener('change', async (event) => {
    
    setColorBox("colorboxDownloadStatus", "red");

    const selectedFile = document.getElementById("fileSelector").files[0];
        const fileName = selectedFile.name;
        const fileType = selectedFile.type;

    setLabel("labelImage", fileName);
    
    const reader = new FileReader();
    reader.onload = function(event){
        document.getElementById("image").src = event.target.result;
        document.getElementById("image").style.display = 'block';
    };
    reader.readAsDataURL(selectedFile);
});

// Send Image over HTTP
document.getElementById("buttonSubmit").addEventListener('click', async (event) => {

    await sendImage();
    await sendMessage();
});

document.getElementById("buttonSubmit").addEventListener('mousedown', async (event) => {
    var style = "";

    style += "background: url('/static/images/send_blue.png');";
    style += "background-size: cover;";
    style += "width: 500px;";
    style += "height: 500px;";
    style += "border-radius: 50px;";
    style += "border-color: black;";
    style += "border: 100px;";

    document.getElementById("buttonSubmit").style = style;
});

document.getElementById("buttonSubmit").addEventListener('mouseup', async (event) => {
    var style = "";

    style += "background: url('/static/images/send_black.png');";
    style += "background-size: cover;";
    style += "width: 500px;";
    style += "height: 500px;";
    style += "border-radius: 50px;";
    style += "border-color: black;";
    style += "border: 100px;";

    document.getElementById("buttonSubmit").style = style;
});

async function sendMessage(){
    // Get the message
    const msg = document.getElementById("messageInput").value;

    setColorBox("colorboxMessageStatus", "yellow");

    const response = await fetch('/message', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: msg
        })
    });

    // Clear the textbox
    document.getElementById("messageInput").value = "";
    
    if(response.ok)
        setColorBox("colorboxMessageStatus", "green");
    else
        setColorBox("colorboxMessageStatus", "red");

    return response.ok;
}

async function sendImage(){
    // Turn status box yellow to indicate pending
    document.getElementById("colorboxDownloadStatus").style = "background-color: yellow";
    
    // Get the selected file
    const selectedFile = document.getElementById("fileSelector").files[0];
        const fileName = selectedFile.name;
        const fileType = selectedFile.type;

    const formData = new FormData();

    formData.append("file", selectedFile);

    // Send over HTTP
    const response = await fetch('/upload', {
        method: "POST",
        body: formData
    });

    // If OK, make status green
    if(response.ok)
        document.getElementById("colorboxDownloadStatus").style = "background-color: green";
    // If not OK, make status red
    else
        document.getElementById("colorboxDownloadStatus").style = "background-color: red";

    return response.ok
}

async function update(){
    const response = await fetch('/alive', {
        method: "GET",
    });

    if(response.ok){
        document.getElementById("colorboxConnectionStatus").style = "background-color: green";
    }
    else
        document.getElementById("colorboxConnectionStatus").style = "background-color: red";
}

function setLabel(id, text){
    document.getElementById(id).innerHTML = text;
}

function setColorBox(id, color){
    document.getElementById(id).style = "background-color: " + color;
}

// Update every second
window.setInterval(update, 1000);