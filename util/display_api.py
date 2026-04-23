from enum import Enum, auto

from PIL import Image


class DisplayType(Enum):
    QT = "qt"
    INKY = "inky"


DEFAULT_DISPLAY_TYPE = DisplayType.QT


class DisplayAPI:

    def __init__(self, disp_type: DisplayType = DEFAULT_DISPLAY_TYPE):
        self.display_type = disp_type

    def set_display_type(self, disp_type: DisplayType):
        self.display_type = disp_type

    def setup(self):

        match self.display_type:

            case DisplayType.QT:

                import util.gui.gui as gui

                gui.show(800, 480)
                gui.exec()

            case DisplayType.INKY:

                import util.canvas.canvas as canvas

            case _:
                print("Invalid Display Type")


    def update_image(self, image: Image.Image):
        
        match self.display_type:

            case DisplayType.QT:

                import util.gui.gui as gui
                import util.gui.qt_bridge as qt_bridge

                # Set the new image to the GUI
                gui.widget.setImage(image)

                # gui.widget.setImageFromName(file_path)

                # Call the GUI update function to show the new image
                qt_bridge.bridge.call_update.emit()

            case DisplayType.INKY:

                import util.canvas.canvas as canvas

                canvas.inky.set_image(image)
                canvas.inky.display_image()

            case _:
                print("Invalid Display Type")


display = DisplayAPI()