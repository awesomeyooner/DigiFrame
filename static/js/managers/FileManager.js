const DEFAULT_BUTTON_SIZE = 300; // px
const CLICKED_BUTTON_SIZE = 200; // px


class FileManager
{
    static #button = new DynamicButton(
        "fileSelector",
        0.25,
        -0.25,
        0.25,
        0.225,
        null,
        async (event) => {
            
            const selectedFile = this.getFile();

            const fileName = selectedFile.name;
            const fileType = selectedFile.type;

            console.log(fileName);
            
            const reader = new FileReader();

            reader.onload = function(event){
                PreviewManager.setImageSrc(event.target.result);
                ImageProcessor.setImageSrc(event.target.result);
            };

            reader.readAsDataURL(selectedFile);
        }
    )

    constructor(){}

    static init()
    {
        CanvasManager.addDrawable(this.#button);
    }

    static getFile()
    {
        return this.#button.button.files[0];
    }

    static getFiles()
    {
        return this.#button.button.files;
    }

    static isFileLoaded()
    {
        return this.getFile() != null
    }


    static getButton()
    {
        return this.#button;
    }

} // class FileManager