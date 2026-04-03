const DEFAULT_BUTTON_SIZE = 300; // px
const CLICKED_BUTTON_SIZE = 200; // px


class FileManager
{
    static #button = document.getElementById("fileSelector");

    static #position = new Point(0, 0);

    static #defaultSize = DEFAULT_BUTTON_SIZE;
    static #clickedSize = CLICKED_BUTTON_SIZE;

    static #currentSize = this.#defaultSize;

    constructor(){}

    static init(initialPosition = new Point(0, 0))
    {
        var smallestDimension = Math.min(getWidth(), getHeight());

        this.setDefaultSize(smallestDimension * 0.25);
        this.setClickedSize(this.getDefaultSize() * 0.8);

        this.#position.setPoint(initialPosition);

        // On Hover event
        this.#button.addEventListener("pointerenter",
            (event) => {
                this.#setRawSize(this.#clickedSize);
                
                this.#setCenter();
            }
        );

        // On Leave Event
        this.#button.addEventListener("pointerleave",
            (event) => {
                this.#setRawSize(this.#defaultSize);

                this.#setCenter();
            }
        );

        this.#button.addEventListener("change",
            async (event) => {
            
            const selectedFile = this.getFile();

            const fileName = selectedFile.name;
            const fileType = selectedFile.type;

            console.log(fileName);
            
            const reader = new FileReader();

            reader.onload = function(event){
                PreviewManager.setImageSrc(event.target.result);
            };

            reader.readAsDataURL(selectedFile);
        });

    }

    static getFile()
    {
        return this.#button.files[0];
    }

    static isFileLoaded()
    {
        return this.getFile() != null
    }

    static drawButton()
    {
        var smallestDimension = Math.min(getWidth(), getHeight());

        this.setDefaultSize(smallestDimension * 0.25);
        this.setClickedSize(this.getDefaultSize() * 0.8);

        this.#setRawSize(this.getDefaultSize());

        this.setPosition(
            new Point(getWidth() / 4, -getHeight() / 4)
        )

        this.#setCenter();
    }

    static getButton()
    {
        return this.#button;
    }

    static getPosition()
    {
        return this.#position;
    }

    static setPosition(newPoint)
    {
        this.#position.setPoint(newPoint);
    }

    static #setCenter()
    {
        var compensatedPosition = this.#position.getCenterOffset(this.#currentSize);

        this.#setRawPosition(
            compensatedPosition.getNativeX(),
            compensatedPosition.getNativeY()
        );
    }

    static #setRawPosition(x, y)
    {
        this.#button.style.left = x + "px";
        this.#button.style.top = y + "px";
    }

    static #setRawSize(size)
    {
        this.#currentSize = size;

        this.#button.style.height = size + "px";
        this.#button.style.width = size + "px";
    }

    static setXY(x, y)
    {
        this.#position.setX(x);
        this.#position.setY(y);
    }

    static getCenter(size)
    {
        var offset = new Point(size / 2, size / 2);

        return this.#position.plus(offset)

    }

    static setDefaultSize(newSize)
    {
        this.#defaultSize = newSize;
    }

    static setClickedSize(newSize)
    {
        this.#clickedSize = newSize;
    }

    static getDefaultSize()
    {
        return this.#defaultSize;
    }

    static getClickedSize()
    {
        return this.#clickedSize;
    }

    static getSizeChange()
    {
        return this.#defaultSize - this.#clickedSize;
    }

    static setSize(newSize)
    {
        this.#currentSize = newSize;
    }

    static getCurrentSize()
    {
        return this.#currentSize;
    }

} // class FileManager