/**
 * CanvasManager.js
 */

const container = document.getElementById('main-container');


class CanvasManager
{

    static drawables = new Array();

    constructor()
    {
        this.drawables = new Array();
    }

    static addDrawable(drawable)
    {
        this.drawables.push(drawable);
    }

    /**
     * Initialize ResizeObserver event callback
     */
    static init()
    {
        const resizeObserver = new ResizeObserver(() => {
            requestAnimationFrame(CanvasManager.refreshCanvas);
        });
        resizeObserver.observe(container);
        CanvasManager.refreshCanvas();
    }


    /**
     * Resizes the canvas to the container and redraws the canvas
     */
    static refreshCanvas()
    {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        
        CanvasManager.drawCanvas();
        CanvasManager.drawDrawables();

        PreviewManager.drawPreview();
        
    }

    static drawCanvas()
    {
        clearCanvas();
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    static drawDrawables()
    {
        for(var drawable of this.drawables)
        {
            drawable.draw();
        }
    }

} // class CanvasManager