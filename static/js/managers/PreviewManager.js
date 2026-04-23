class PreviewManager
{

    static #image = new Image();

    static #position = new Point(0, 0);

    static #maxWidth = 0;
    static #maxHeight = 0;

    static #imageWidth = 0;
    static #imageHeight = 0;

    static #degreesCW = 0;

    static #isFlipped = false;

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
        this.#degreesCW = degrees;

        this.#degreesCW %= 360;

        // If number of 9 degree rotations is odd
        // Then it is flipped since degrees would either be 90 or 270
        this.#isFlipped = (this.#degreesCW / 90) % 2 == 1;
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
            
        if(!this.#isFlipped)
        {

            // The source image dimensions
            const srcWidth = this.#image.naturalWidth;
            const srcHeight = this.#image.naturalHeight;

            var [targetWidth, targetHeight] = ImageManipulator.fitImageIntoDimensions(
                this.#maxWidth,
                this.#maxHeight,
                srcWidth,
                srcHeight
            );

            this.setSize(targetWidth, targetHeight);
        }
        else
        {

            // The source image dimensions
            const srcWidth = this.#image.naturalWidth;
            const srcHeight = this.#image.naturalHeight;

            // Switch the source dimensions since we expect to have the image's width to be its height
            // since its flipped and same for height -> width
            var [targetWidth, targetHeight] = ImageManipulator.fitImageIntoDimensions(
                this.#maxWidth,
                this.#maxHeight,
                srcHeight,
                srcWidth
            );

            this.setSize(targetWidth, targetHeight);
        }
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