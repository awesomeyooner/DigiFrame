class ConnectionManager
{
    constructor(){}

    static async sendImage()
    {
        const file = FileManager.getFile();

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

        if(response.ok)
            console.log("Image sent successfully!");
        else
            console.log("Image failed to send!");

        return response.ok
    }

    static async sendFile(file)
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

        if(response.ok)
            console.log("Image sent successfully!");
        else
            console.log("Image failed to send!");

        return response.ok
    }

} // class ConnectionManager