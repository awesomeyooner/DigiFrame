import asyncio
import threading
import multiprocessing
import numpy as np

import util.server as server

import util.display_api as display_api
from util.display_api import DisplayType

# The host IP Address
HOST = '0.0.0.0'

# The port to run the app on
PORT = 8000


def run_app():
    server.app.run(host=HOST, port=PORT, use_reloader=False)


def main():

    print("==============================")
    print("Starting up App...")
    print("==============================")
    
    # Control initilization depending on display type
    match display_api.display.display_type:

        # If we're using QT,
        # Then we must use a seperate thread for Flask
        case DisplayType.QT:

            # Start flask as a seperate thread
            flask_thread = multiprocessing.Process(target=run_app)
            flask_thread.daemon = True
            flask_thread.start()

            # Run the GUI as the main thread
            display_api.display.setup()

        # If we're using an inky display
        # Then just init as usual but start the app last
        # since it's blocking
        case DisplayType.INKY:

            # Init the inky display
            display_api.display.setup()

            # Run the Flask App
            run_app()

        case _:
            print("Invalid Display Type")


if __name__ == '__main__':
    main()
    
