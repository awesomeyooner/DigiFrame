class PreviewManager
{

    static #image = new Image();

    static #position = new Point(0, 0);

    static #maxWidth = 0;
    static #maxHeight = 0;

    static #imageWidth = 0;
    static #imageHeight = 0;

    static #degreesCW = 0;

    constructor(){}

    static init()
    {

        this.#image.onload = () =>
        {
            this.updateDimensions();

            CanvasManager.drawCanvas();
            this.drawPreview();
        }
        
        this.setImageSrc("/static/images/empty_image.png");
    }

    static getImage()
    {
        return this.#image;
    }

    static setImageSrc(newSrc)
    {
        this.#image.src = newSrc;
    }

    static setPosition(newPosition)
    {
        this.#position.setPoint(newPosition);
    }

    static setRotationCW(degrees)
    {
        // Set the degrees and constrain to [0, 360)
        this.#degreesCW = degrees % 360;
    }

    static incrementRotationCW(degrees)
    {
        this.setRotationCW(this.#degreesCW + degrees);
    }

    static getCenter()
    {
        return this.#position.getCenterOffset(this.#imageWidth, this.#imageHeight);
    }

    static updateDimensions()
    {
        this.#maxWidth = getWidth() * 0.5;
        this.#maxHeight = getHeight() * 0.5;
            
        // The source image dimensions

        var srcWidth = this.#image.naturalWidth;
        var srcHeight = this.#image.naturalHeight;

        // Switch the source dimensions since we expect to have the image's width to be its height
        // since its flipped and same for height -> width
        if(!ImageManipulator.isFlipping(this.#degreesCW))
        {
            srcWidth = this.#image.naturalWidth;
            srcHeight = this.#image.naturalHeight;
        }
        else
        {
            srcWidth = this.#image.naturalHeight;
            srcHeight = this.#image.naturalWidth; 
        }

        var [targetWidth, targetHeight] = ImageManipulator.fitImageIntoDimensions(
            this.#maxWidth,
            this.#maxHeight,
            srcWidth,
            srcHeight
        );

        this.setSize(targetWidth, targetHeight);
    }

    static drawPreview()
    {
        this.setPosition(
            new Point(0, getHeight() / 5)
        );

        this.updateDimensions();

        var edgePadding = Math.max(this.#maxWidth, this.#maxHeight) * 0.05;

        context.fillStyle = "brown";
        Shapes.rectangleCenterFromPoint(
            this.#position,
            this.#maxWidth + edgePadding,
            this.#maxHeight + edgePadding
        );

        context.fillStyle = "gray";
        Shapes.rectangleCenterFromPoint(
            this.#position,
            this.#maxWidth,
            this.#maxHeight
        );

        context.fillStyle = "black";
        Shapes.rectangleCenterFromPoint(
            this.#position,
            this.#imageWidth,
            this.#imageHeight
        );

        ImageManipulator.rotateCW(
            this.#image,
            context,
            this.#position,
            this.#degreesCW,
            this.#imageWidth,
            this.#imageHeight
        );
    }

    static setSize(width, height)
    {
        this.#imageWidth = width;
        this.#imageHeight = height;
    }


} // class PreviewManager