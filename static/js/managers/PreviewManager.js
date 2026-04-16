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
            const srcWidth = this.#image.naturalWidth;
            const srcHeight = this.#image.naturalHeight;
            
            var widthDiff = this.#maxWidth - srcWidth;
            var heightDiff = this.#maxHeight - srcHeight;

            var scale = 1;

            // If the image is smaller in both dimensions that max
            if(widthDiff > 0 && heightDiff > 0)
            {
                if(widthDiff < heightDiff)
                    scale = Math.abs(this.#maxWidth / srcWidth);
                else if(widthDiff > heightDiff)
                    scale = Math.abs(this.#maxHeight / srcHeight);
            }
            // If the width is larger than the max but not height
            else if(widthDiff < 0 && heightDiff > 0)
                scale = Math.abs(this.#maxWidth / srcWidth);
            // If the height is larger than max but not width
            else if(widthDiff > 0 && heightDiff < 0)
                scale = Math.abs(this.#maxHeight / srcHeight);
            // If BOTH dimensions are larger than max
            // Then the scale is the one that's farthest away from max
            else if(widthDiff < 0 && heightDiff < 0)
            {
                if(Math.abs(widthDiff) < Math.abs(heightDiff))
                    scale = Math.abs(this.#maxWidth / srcWidth);
                else if(Math.abs(widthDiff) > Math.abs(heightDiff))
                    scale = Math.abs(this.#maxHeight / srcHeight);
            }

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