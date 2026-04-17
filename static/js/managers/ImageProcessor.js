class ImageProcessor
{
    static #canvas = document.getElementById('imageProcessingCanvas');
    static #context = this.#canvas.getContext('2d');

    static #image = new Image();

    static #angle = 0;

    static init()
    {
        this.#image.onload = () => 
        {
            this.updateCanvas();
        }
    }

    static updateCanvas()
    {
        this.#canvas.setAttribute('width', this.#image.width);
        this.#canvas.setAttribute('height', this.#image.height);

        this.drawImage();
    }

    static setImageSrc(newSrc)
    {
        this.#image.src = newSrc;
    }

    static drawCanvas()
    {
        this.#context.restore();

        this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

        this.#context.fillStyle = "white";
        this.#context.fillRect(0, 0, this.#canvas.width, this.#canvas.height);
    }

    static drawImage()
    {
        this.drawCanvas();

        this.#context.drawImage(
            this.#image,
            0,
            0,
            this.#image.width,
            this.#image.height
        );
    }

    static rotateCW(N = 1)
    {
        // N represents 90 degree turns
        this.#angle += N * 90;

        // Constrict angle to 360
        this.#angle %= 360;

        var radians = this.#angle * (Math.PI / 180);
        
        // If we are just flipping top <-> bottom
        var isFlipping = this.#angle % 180 == 0;

        if(isFlipping)
        {
            // Keep normal Dimensions
            this.#canvas.setAttribute('width', this.#image.width);
            this.#canvas.setAttribute('height', this.#image.height);
        }
        else
        {
            // Swap dimensions
            this.#canvas.setAttribute('width', this.#image.height);
            this.#canvas.setAttribute('height', this.#image.width);
        }

        if(this.#angle == 90)
        {
            this.#context.translate(
                this.#image.height,
                0
            );
        }
        else if(this.#angle == 180)
        {
            this.#context.translate(
                this.#canvas.width,
                this.#canvas.height
            );
        }
        else if(this.#angle == 270)
        {
            this.#context.translate(
                0,
                this.#image.width
            );
        }

        // Apply the rotation
        this.#context.rotate(radians);

        // Draw the image
        this.drawImage();
    
        this.#canvas.toBlob((blob) => {
            console.log(blob);
            ConnectionManager.sendFile(blob);
        }, 'image/png');
    }
}