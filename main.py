import asyncio
import threading
import multiprocessing
import numpy as np

import server
import display_api

# The host IP Address
HOST = '0.0.0.0'

# The port to run the app on
PORT = 8000


def run_app():
    server.app.run(host=HOST, port=PORT, use_reloader=False)


def main():

    print("==============================")
    print("Starting up App...")
    print("Click on the image and press ESC to quit")
    print("==============================")

    # run_app()

    # flask_thread = multiprocessing.Process(target=run_app)
    # flask_thread.daemon = True
    # flask_thread.start()

    flask_thread = threading.Thread(target=run_app)
    flask_thread.daemon = True
    flask_thread.start()

    display_api.init()

if __name__ == '__main__':
    main()
    
