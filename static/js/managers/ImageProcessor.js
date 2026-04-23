class ImageProcessor
{
    static #canvas = document.getElementById('imageProcessingCanvas');
    static #context = this.#canvas.getContext('2d');

    static #image = new Image();

    static #center = new Point(0, 0);

    static #degreesCW = 0;

    static init()
    {
        this.#image.onload = () => 
        {
            this.drawImage();
        }
    }

    static async getOrientation(file)
    {
        return new Promise(
            (resolve) => {
                EXIF.getData(file, function(){
                    const orientation = EXIF.getTag(this, "Orientation");
                    resolve(orientation);
                });
            });
    }

    static setImageSrc(newSrc)
    {
        this.#image.src = newSrc;
    }

    static clearCanvas()
    {
        // If we are just flipping top <-> bottom
        var isFlipping = ImageManipulator.isFlipping(this.#degreesCW);

        if(!isFlipping)
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
        
        this.#context.restore();

        this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

        this.#context.fillStyle = "white";
        this.#context.fillRect(0, 0, this.#canvas.width, this.#canvas.height);
    }

    static setRotationCW(degrees)
    {
        // Set the new degrees but constrain to [0, 360)
        this.#degreesCW = degrees % 360;
    }

    static incrementRotationCW(degrees)
    {
        this.setRotationCW(this.#degreesCW + degrees);
    }

    static drawImage()
    {
        this.clearCanvas();

        var isFlipping = ImageManipulator.isFlipping(this.#degreesCW);

        var targetWidth = this.#image.width;
        var targetHeight = this.#image.height;

        if(isFlipping)
        {
            targetWidth = this.#image.height;
            targetHeight = this.#image.width;
        }

        ImageManipulator.rotateCW(
            this.#image,
            this.#context,
            this.#center,
            this.#degreesCW,
            targetWidth,
            targetHeight,
            this.#canvas.width,
            this.#canvas.height
        );
    
        this.#canvas.toBlob((blob) => {
            console.log(blob);
            ConnectionManager.setFile(blob);
        }, 'image/png');
    }
}