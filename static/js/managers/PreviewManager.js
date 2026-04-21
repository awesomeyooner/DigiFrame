class PreviewManager
{

    static #image = new Image();

    static #position = new Point(0, 0);

    static #maxWidth = 0;
    static #maxHeight = 0;

    static #imageWidth = 0;
    static #imageHeight = 0;

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

    static getCenter()
    {
        return this.#position.getCenterOffset(this.#imageWidth, this.#imageHeight);
    }

    static updateDimensions()
    {
        this.#maxWidth = getWidth() * 0.5;
        this.#maxHeight = getHeight() * 0.5;

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
            270,
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