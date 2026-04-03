const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');


/**
 * Clears everything on the canvas
 */
function clearCanvas()
{
    context.clearRect(0, 0, canvas.width, canvas.height);

} // end of "clearCanvas()"


function getWidth()
{
    return canvas.width;
}

function getHeight()
{
    return canvas.height
}