// const container = document.getElementById('main-container');

// Initialize the Mouse object
Mouse.init();
Keyboard.initialize(window);

// Initialize the Canvas
CanvasManager.init();

// Initialize the file sender
FileManager.init();

// Initialize the image preview
PreviewManager.init();

// Initialize the Image Processing handler
ImageProcessor.init();

// Mouse.configureBinding(() => console.log("Hello World!"), MouseState.ON_PRESS);
SendButton.init();

RotateButton.init();

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

    Keyboard.update();

    try
    {
        const response = await fetch('/alive', {
            method: "GET",
        });

        if(response.ok)
            context.fillStyle = "green";
    }
    catch(error)
    {
        context.fillStyle = "red";
    }        

    Shapes.rectangleCenter(getWidth() * 0.40, getHeight() * 0.25, getSmallestDimension() * 0.1, getSmallestDimension() * 0.1);
}

// Update every second
window.setInterval(update, 1000);