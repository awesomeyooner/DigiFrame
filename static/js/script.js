// const container = document.getElementById('main-container');

// Initialize the Mouse object
Mouse.init();

// Initialize the Canvas
CanvasManager.init();

// Initialize the file sender
FileManager.init();

// Initialize the image preview
PreviewManager.init();

// Mouse.configureBinding(() => console.log("Hello World!"), MouseState.ON_PRESS);

const button = document.getElementById("buttonSubmit");

// Send Image over HTTP
button.addEventListener('click', async (event) => {

    await ConnectionManager.sendImage();
    // await sendMessage();
});

button.addEventListener('pointerdown', async (event) => {
    button.style.width = getWidth() * 0.25 + "px";
    button.style.height = getWidth() * 0.25 + "px";
    // button.style.background = "url('/static/images/send_blue.png')";
});

// button.style.width = getWidth() * 0.25;
// button.style.height = getHeight() * 0.25;
// button.style.background = "url('/static/images/send_blue.png')";

button.addEventListener('pointerup', async (event) => {
    button.style.width = getWidth() * 0.25 + "px";
    button.style.height = getWidth() * 0.25 + "px";
    // button.style.background = "url('/static/images/send_black.png')";
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

async function update(){
    const response = await fetch('/alive', {
        method: "GET",
    });

    if(response.ok)
        context.fillStyle = "green";
    else
        context.fillStyle = "green";

    Shapes.rectangleCenter(0, 0, 50, 50);
}

// Update every second
window.setInterval(update, 1000);