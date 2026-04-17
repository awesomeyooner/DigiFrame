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
        this.#angle += N * 90;
        this.#angle %= 360;

        console.log(this.#angle);
        var radians = this.#angle * (Math.PI / 180);
        
        var isFlipping = this.#angle % 180 == 0;

        // if(isFlipping)
        // {
        //     // Flip dimensions
        //     this.#canvas.setAttribute('width', this.#image.height);
        //     this.#canvas.setAttribute('height', this.#image.width);
        // }
        // else
        // {
        //     // Swap Dimensions
        //     this.#canvas.setAttribute('width', this.#image.width);
        //     this.#canvas.setAttribute('height', this.#image.height);
        // }

        // // Refresh the canvas
        // this.drawCanvas();

        // If you're simply flipping the image, then no need to swap dimensions
        if(!isFlipping)
        {
            // Flip dimensions
            this.#canvas.setAttribute('width', this.#image.height);
            this.#canvas.setAttribute('height', this.#image.width);

            this.drawCanvas();

            if(this.#angle == 90)
            {
                this.#context.translate(
                    this.#image.height,
                    0
                );
            }
            else if(this.#angle == 270)
            {
                this.#context.translate(
                    0,
                    this.#image.width
                );
            }

            this.#context.rotate(radians);

            this.drawCanvas();

            this.#context.drawImage(
                this.#image,
                0,
                0,
                this.#image.width,
                this.#image.height
            );

        }
        else
        {
            this.#canvas.setAttribute('width', this.#image.width);
            this.#canvas.setAttribute('height', this.#image.height);

            this.drawCanvas();

            if(this.#angle == 180)
            {
                this.#context.translate(
                    this.#canvas.width,
                    this.#canvas.height
                );

                this.#context.rotate(radians);

                this.#context.drawImage(
                    this.#image,
                    0,
                    0,
                    this.#image.width,
                    this.#image.height
                );

                // this.#context.drawImage(
                //     this.#image,
                //     this.#image.width,
                //     this.#image.height,
                //     this.#image.width,
                //     this.#image.height
                // );
            }
            else
            {
                this.#context.drawImage(
                    this.#image,
                    0,
                    0,
                    this.#image.width,
                    this.#image.height
                );
            }
        }
    
    }
}