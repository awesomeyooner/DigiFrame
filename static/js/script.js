// const container = document.getElementById('main-container');

// Initialize the Mouse object
Mouse.init();
Keyboard.initialize(window);

Keyboard.configureBinding("q", () => ImageProcessor.rotateCW(1), BindType.WHILE_PRESSED);

// Initialize the Canvas
CanvasManager.init();

// Initialize the file sender
FileManager.init();

// Initialize the image preview
PreviewManager.init();

ImageProcessor.init();

// Mouse.configureBinding(() => console.log("Hello World!"), MouseState.ON_PRESS);

const sendButton = new DynamicButton("buttonSubmit", 0, -0.25, 0.30, 0.285, 
    async (event) => {

        console.log("Preparing to send file...");

        var isOK = await ConnectionManager.sendFile();

        if(isOK)
            console.log("File send successfully!");
        else
            console.log("File failed to send!");
    }
);

CanvasManager.addDrawable(sendButton);

const rotateButton = new DynamicButton("buttonRotate", -0.25, -0.25, 0.25, 0.225, 
    async (event) => {
        PreviewManager.incrementRotationCW(90);
        CanvasManager.resizeCanvas();

        ImageProcessor.incrementRotationCW(90);
        ImageProcessor.drawImage();
    }
);

CanvasManager.addDrawable(rotateButton);

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