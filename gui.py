from gui_manager import *


app = QApplication([])
widget = GUIManager()

def show(width: int = -1, height: int = -1):

    # If width and height are specified
    # Then use them for the GUI size
    if(width != -1 and height != -1):
        widget.setFixedSize(width, height)
        widget.show()
    # If not
    # Then just do fullscreen
    else:
        widget.showFullScreen()

def exec():
    app.exec()