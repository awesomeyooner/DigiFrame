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
            // The source image dimensions
            const srcWidth = this.#image.naturalWidth;
            const srcHeight = this.#image.naturalHeight;
            
            // The ratio to scale the source in order to match the max dimensions
            var widthRatio = this.#maxWidth / srcWidth;
            var heightRatio = this.#maxHeight / srcHeight;

            // The overall scale is the smallest ratio
            // Because if we choose the bigger one then that means one of the
            // Dimensions will be OVER scaled
            var scale = Math.min(widthRatio, heightRatio);

            var targetWidth = scale * srcWidth;
            var targetHeight = scale * srcHeight;

            this.setSize(targetWidth, targetHeight);

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

    static updateMaxDimensions()
    {
        this.#maxWidth = getWidth() * 0.5;
        this.#maxHeight = getHeight() * 0.5;
    }

    static drawPreview()
    {
        this.setPosition(
            new Point(0, getHeight() / 5)
        );

        this.updateMaxDimensions();

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

        var centerPoint = this.getCenter();

        context.drawImage(
            this.#image,
            centerPoint.getNativeX(),
            centerPoint.getNativeY(),
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