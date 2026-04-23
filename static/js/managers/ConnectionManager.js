class ConnectionManager
{

    static #file = null;

    constructor(){}

    static setFile(file)
    {
        this.#file = file;
    }

    static async sendFile(file = this.#file)
    {
        if(file == null)
            return false;

        var fileName = file.name;
        var fileType = file.type;

        var formData = new FormData();

        formData.append("file", file);

        const response = await fetch('/upload',
            {
                method: "POST",
                body: formData
            }
        );

        return response.ok;
    }

} // class ConnectionManager