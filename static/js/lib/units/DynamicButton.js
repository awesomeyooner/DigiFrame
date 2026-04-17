class DynamicButton extends Button
{
    constructor(elementId, xScale, yScale, defaultScale, clickedScale, onClick)
    {
        super(elementId, 0, 0, 0, 0, onClick);

        this.xScale = xScale;
        this.yScale = yScale;
        this.defaultScale = defaultScale;
        this.clickedScale = clickedScale;
        
        

        this.updateProperties();
    }

    draw()
    {
        this.updateProperties();
        super.draw();
    }

    updateProperties()
    {
        var width = getWidth();
        var height = getHeight();

        this.setPoint(
            new Point(
                this.xScale * width,
                this.yScale * height
            )
        );

        this.defaultSize = this.defaultScale * getSmallestDimension();
        this.clickedSize = this.clickedScale * getSmallestDimension();

        this.currentSize = this.defaultSize;
    }


}