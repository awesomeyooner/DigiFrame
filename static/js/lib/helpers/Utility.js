class Utility{

    /**
     * Gets a random number within the bounds
     * @param {number} lowerBound The Lowest that this can return
     * @param {number} upperBound The Max that this can return 
     * @returns 
     */
    static random(lowerBound, upperBound){
        return (Math.random() * (upperBound - lowerBound)) + lowerBound;
    }

    /**
     * Gets an array of points that represens the corners of the box. Starts with Top Right and goes goes clockwise
     * @param {number} w Width of the box
     * @param {number} h Height of the box 
     * @returns an array of points that represents the corners of the box
     */
    static getCenterBoxCorners(w = canvas.width, h = canvas.height){
        var corners = [
            new Point(w / 2, h / 2),
            new Point(w / 2, -h / 2),
            new Point(-w / 2, -h / 2),
            new Point(-w / 2, h / 2)
        ];

        return corners;
    }

    /**
     * Gets the native coordinates of a cartesian point, represented as a tuple
     * @param {number} x X coordinate, cartestian
     * @param {number} y Y coordinate, cartesian
     * @param {number} w Width of the frame
     * @param {number} h Height of the frame
     * @returns Tuple of the Converted X and Y Coordinates
     */
    static cartesianToNative(x, y, w = canvas.width, h = canvas.height){
        var xNew = this.cartesianToNativeX(x, w);
        var yNew = this.cartesianToNativeY(y, h);

        return {x: xNew, y: yNew};
    }

    /**
     * Gets the cartesian coordinates of a native point, represented as a tuple
     * @param {number} x X coordinate, native
     * @param {number} y Y coordinate, native
     * @param {number} w Width of the frame
     * @param {number} h Height of the frame
     * @returns Tuple of the Converted X and Y Coordinates
     */
    static nativeToCartesian(x, y, w = canvas.width, h = canvas.height){
        var xNew = this.nativeToCartesianX(x, w);
        var yNew = this.nativeToCartesianY(y, h);

        return {x: xNew, y: yNew};
    }

    /**
     * Gets the native coordinate of the given cartesian coordinate
     * @param {number} x X coordinate, cartesian
     * @param {number} w Width of the frame
     * @returns The convrted native coordinate
     */
    static cartesianToNativeX(x, w = canvas.width){
        return x + Math.round(w / 2);
    }

    /**
     * Gets the native coordinate of the given cartesian coordinate
     * @param {number} x X coordinate, cartesian
     * @param {number} w Width of the frame
     * @returns The converted native coordinate
     */
    static cartesianToNativeY(y, h = canvas.height){
        return -y + Math.round(h / 2);
    }

    /**
     * Gets the cartestian coordinate of the given native coordinate
     * @param {number} x X coordinate, native
     * @param {number} w Width of the frame 
     * @returns The converted cartesian coordinate
     */
    static nativeToCartesianX(x, w = canvas.width){
        return x - Math.round(w / 2);   
    }

    /**
     * Gets the cartestian coordinate of the given native coordinate
     * @param {number} y Y coordinate, native
     * @param {number} w Width of the frame 
     * @returns The converted cartesian coordinate
     */
    static nativeToCartesianY(y, h = canvas.height){
        return -y + Math.round(h / 2);
    }
}