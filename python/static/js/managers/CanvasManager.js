/**
 * CanvasManager.js
 */

const container = document.getElementById('main-container');


class CanvasManager
{
    constructor(){}

    /**
     * Initialize ResizeObserver event callback
     */
    static init()
    {
        const resizeObserver = new ResizeObserver(() => {
            requestAnimationFrame(CanvasManager.resizeCanvas);
        });
        resizeObserver.observe(container);
        CanvasManager.resizeCanvas();
    }


    /**
     * Resizes the canvas to the container and redraws the canvas
     */
    static resizeCanvas()
    {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        CanvasManager.drawCanvas();
    }

    static drawCanvas()
    {
        clearCanvas();
        context.fillStyle = "blue";
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = "red";
        Shapes.rectangleCenter(0, 0, 100, 100);

        Shapes.circleCenter(0, 0, 200);
        context.fillStyle = "purple";
        context.fill();
    }

} // class CanvasManager