const MouseState = {
    WHILE_DOWN: "while_down",
    WHILE_UP: "while_up",
    ON_PRESS: "on_press",
    ON_RELEASE: "on_release"
}

class Mouse{

    static #isMousePressed = false;

    static #onPress;
    static #onRelease;
    static #whileDown;
    static #whileUp;

    static #point = new Point();

    constructor(){}

    static init()
    {
        // Callback whenever the pointer moves
        // Purpose is to update the mouse position in cartesian coordinates
        canvas.addEventListener('pointermove', 
            function(event)
            {
                var x = event.clientX;
                var y = event.clientY;

                Mouse.#point.set(
                    Utility.nativeToCartesianX(x),
                    Utility.nativeToCartesianY(y)
                );

                console.log("moved");
            }
        );

        // Callback whenever the pointer is pressed down
        // Purpsoe is to call the update function with mousestate being pressed down
        canvas.addEventListener('pointerdown', 
            function(event)
            {
                event.preventDefault();

                Mouse.update(true);

                console.log("down");
            }
        );

        // Callback whenever the pointer is pressed up
        // Purpsoe is to call the update function with mousestate being pressed up
        canvas.addEventListener('pointerup', 
            function(event)
            {
                event.preventDefault();

                Mouse.update(false);

                console.log("up");
            }
        );
    }

    /**
     * Updates the given binding commands
     * @param {boolean} newMousePressed `true` if the mouse is pressed. `false` if it is not 
     */
    static update(newMousePressed)
    {
        if(this.#onRelease != null && this.#isMousePressed && !newMousePressed) //going from held to not held aka RELEASE
            this.#onRelease();
        else if(this.#onPress != null && !this.#isMousePressed && newMousePressed) //going from not held to held aka PRESS
            this.#onPress();

        this.#isMousePressed = newMousePressed;

        if(this.#whileDown != null && this.isPressed())
            this.#whileDown();
        else if(this.#whileUp != null && !this.isPressed())
            this.#whileUp();
    }

    /**
     * Adds a function to the binds
     * @param {Function} method 
     * @param {MouseState} state 
     * @example configureBinding(() => console.log("Hello World!"), MouseState.ON_PRESS);
     */
    static configureBinding(method, state){
        switch(state){
            case MouseState.WHILE_DOWN:
                this.#whileDown = method;
                break;

            case MouseState.WHILE_UP:
                this.#whileUp = method;
                break;

            case MouseState.ON_PRESS:
                this.#onPress = method;
                break;

            case MouseState.ON_RELEASE:
                this.#onRelease = method;
                break;
        }
    }

    static get(){
        return this.#point;
    }

    static isPressed(){
        return this.#isMousePressed;
    }
}