import asyncio
import threading
import multiprocessing
import numpy as np

from util import util
import server
import gui

def run_app():
    server.app.run(host='0.0.0.0', port=8000, use_reloader=False)

def run_gui():
    gui.show()
    gui.exec()

if __name__ == '__main__':

    flask_thread = multiprocessing.Process(target=run_app)
    flask_thread.daemon = True
    flask_thread.start()

    run_gui()