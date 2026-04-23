class ImageManipulator
{

    static isFlipping(degrees)
    {
        // If degrees is an odd multiple of 90
        // Then it is flipping
        return (degrees / 90) % 2 == 1;
    }

    static rotateCW(image, context, center, degrees, width, height)
    {
        var compensatedCenter = center.getCenterOffset(width, height);

        // Normalize to [0, 360)
        var normalizedDegrees = degrees % 360;

        // Convert to radians
        var radians = normalizedDegrees * Math.PI / 180;

        var dimensionDiff = width - height;

        // Only need to apply translations for angles NOT 0
        if(normalizedDegrees == 90)
        {
            context.translate(
                height + dimensionDiff,
                0
            );
        }
        else if(normalizedDegrees == 180)
        {
            context.translate(
                width,
                height
            );
        }
        else if(normalizedDegrees == 270)
        {
            context.translate(
                0,
                width - dimensionDiff
            );
        }

        // Rotate Context after offset transation
        context.rotate(radians);

        // Resultant point after rotation matrix (must convert to native first)
        // It's negative since Canvas API rotates CW for positive but I like SI and SI uses
        // CCW as positive
        var rotatedPoint = compensatedCenter.asNative().rotate(-radians);

        // Draw the image with the compensated values
        
        var drawnWidth = width;
        var drawnHeight = height;

        var isFlipped = this.isFlipping(degrees);

        // If the image is flipped
        // Then flip the drawing dimensions
        if(isFlipped)
        {
            drawnWidth = height;
            drawnHeight = width;
        }

        context.drawImage(
            image,
            rotatedPoint.getCartesianX(),
            rotatedPoint.getCartesianY(),
            drawnWidth,
            drawnHeight
        ); 

        // Reset the transforms so that later calls aren't affected
        context.resetTransform();
    }


    static fitImageIntoDimensions(maxWidth, maxHeight, srcWidth, srcHeight)
    {
        // The ratio to scale the source in order to match the max dimensions
        var widthRatio = maxWidth / srcWidth;
        var heightRatio = maxHeight / srcHeight;

        // The overall scale is the smallest ratio
        // Because if we choose the bigger one then that means one of the
        // Dimensions will be OVER scaled
        var scale = Math.min(widthRatio, heightRatio);

        var targetWidth = scale * srcWidth;
        var targetHeight = scale * srcHeight;

        return [targetWidth, targetHeight];
    }
}