class SendButton
{
    static dynamicButton = new DynamicButton(
        "buttonSubmit", // HTML Button ID 
        0, // x position (% of width)
        -0.25, // y position (% of height)
        0.30, // Idle Size (% of smallest dimension)
        0.285, // Clicked Size (% of smallest dimension)
        async (event) => { // On-Click event
            console.log("Preparing to send file...");

            this.setLoading();

            var isOK = await ConnectionManager.sendFile();

            if(isOK)
            {
                this.setOK();
                console.log("File send successfully!");
            }
            else
            {
                this.setFailed();
                console.log("File failed to send!");
            }
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

    static setLoading()
    {
        this.#getButton().style.backgroundImage = "url('/static/images/loading1.png')";
        this.#getButton().style.animation = "spin 4s linear infinite";
    }

    static setOK()
    {
        this.#getButton().style.backgroundImage = "url('/static/images/check.png')";
        this.#getButton().style.animation = "";
    }

    static setFailed()
    {
        this.#getButton().style.backgroundImage = "url('/static/images/cross.png')";
        this.#getButton().style.animation = "";
    }
}