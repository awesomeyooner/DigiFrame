class Button extends Drawable
{

    constructor(elementId, x, y, defaultSize, clickedSize, onClick)
    {
        super(x, y);

        this.button = document.getElementById(elementId);

        this.defaultSize = defaultSize;
        this.clickedSize = clickedSize;

        this.currentSize = defaultSize;

        this.#updateCenter();

        // On Hover
        // - Set the size to the clicked size
        // - Update the center coordinate based on size
        this.button.addEventListener("pointerenter",
            (event) => {
                this.currentSize = this.clickedSize;
                this.#updateCenter();
            }
        );

        // On Leave
        // - Set the size back to the default size
        // - Update the center coordinate based on size
        this.button.addEventListener("pointerleave",
            (event) => {
                this.currentSize = this.defaultSize;
                this.#updateCenter();
            }
        );

        this.button.addEventListener("click", onClick);

    } // end of constructor(string, int, int, int, int)


    draw()
    {
        this.#updateCenter();
    }


    #updateCenter()
    {
        this.#setRawSize(this.currentSize);

        var compensatedPosition = this.getCenterOffset(this.currentSize);

        this.#setRawPosition(
            compensatedPosition.getNativeX(),
            compensatedPosition.getNativeY()
        );
    }


    #setRawPosition(x, y)
    {
        this.button.style.left = x + "px";
        this.button.style.top = y + "px";
    }


    #setRawSize(size)
    {
        this.currentSize = size;

        this.button.style.width = size + "px";
        this.button.style.height = size + "px"

    } // end of "setRawSize(size)"
}