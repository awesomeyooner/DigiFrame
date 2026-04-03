class PreviewManager
{

    static #image = new Image();

    static #position = new Point(0, 0);

    static #maxWidth = getWidth();
    static #maxHeight = getHeight();

    static #imageWidth = 0;
    static #imageHeight = 0;

    constructor(){}

    static init()
    {

        this.#image.onload = () =>
        {
            const srcWidth = this.#image.naturalWidth;
            const srcHeight = this.#image.naturalHeight;
            
            var widthDiff = Math.abs(srcWidth - this.#maxWidth);
            var heightDiff = Math.abs(srcHeight - this.#maxHeight);

            // If you're closer to matching width
            // Then make target width the max width
            var scale = widthDiff < heightDiff ? this.#maxWidth / srcWidth : this.#maxHeight / srcHeight;
            
            var targetWidth = scale * srcWidth;
            var targetHeight = scale * srcHeight;

            this.setSize(targetWidth, targetHeight);

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

    static updateMax

    static drawPreview()
    {
        this.setPosition(
            new Point(0, getHeight() / 5)
        );

        this.#maxWidth = getWidth() * 0.5;
        this.#maxHeight = getHeight() * 0.5;

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