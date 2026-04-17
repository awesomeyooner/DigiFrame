from enum import Enum, auto

from PIL import Image


class DisplayType(Enum):
    QT = auto()
    INKY = auto()


DEFAULT_DISPLAY_TYPE = DisplayType.QT


def init(disp_type: DisplayType = DEFAULT_DISPLAY_TYPE):
    
    match disp_type:

        case DisplayType.QT:

            import gui

            gui.show()
            gui.exec()

        case DisplayType.INKY:

            import canvas

        case _:
            print("Invalid Display Type")


def update_image(image: Image.Image, disp_type: DisplayType = DEFAULT_DISPLAY_TYPE):
    
    match disp_type:

        case DisplayType.QT:

            import gui
            import qt_bridge

            # Set the new image to the GUI
            gui.widget.setImage(image)

            # gui.widget.setImageFromName(file_path)

            # Call the GUI update function to show the new image
            qt_bridge.bridge.call_update.emit()

        case DisplayType.INKY:

            import canvas

            canvas.inky.display_image(image)

        case _:
            print("Invalid Display Type")