class RotateButton
{
    static dynamicButton = new DynamicButton(
        "buttonRotate", // HTML Button ID 
        -0.25, // x position (% of width)
        -0.25, // y position (% of height)
        0.25, // Idle Size (% of smallest dimension)
        0.225, // Clicked Size (% of smallest dimension)
        async (event) => { // On-Click event
            console.log("Rotating image 90 degrees...");

            this.rotateImage();
        });

    constructor(){}

    static init()
    {
        CanvasManager.addDrawable(this.dynamicButton);
    }

    static #getButton()
    {
        return this.dynamicButton.button;
    }

    static rotateImage()
    {
        // Rotate the displayed image and redraw the canvas to reflect rotation
        PreviewManager.incrementRotationCW(90);
        CanvasManager.refreshCanvas();

        // Rotate the backend image and reprocess the image for sending
        ImageProcessor.incrementRotationCW(90);
        ImageProcessor.drawImage();
    }
}