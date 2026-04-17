from inky.auto import auto
from PIL import Image
import image_manager


DEFAULT_IMAGE: str = "./images/default.png"

BACKGROUND_COLOR = "black"

DISPLAY_WIDTH = 800
DISPLAY_HEIGHT = 480


class CanvasManager:
	
    def __init__(self, default_image: str = None):

        # Create the Inky Display
        self.display = auto()

        # Display Dimensions. display.resolution is a tuple (width, height)
        self.width: int = self.display.resolution[0]
        self.height: int = self.display.resolution[1]

        # The background color of the padded space
        self.background_color: str = BACKGROUND_COLOR

        # If it's none
        # Then use the system default image
        if(default_image == None):
            self.image = Image.open(DEFAULT_IMAGE)
        # If not
        # Then set the default image to the parameter
        else:
            self.image = Image.open(default_image)

    def display_image(self):

        # Resize the image if necessary
        resized = image_manager.force_dimensions(self.image, self.width, self.height, self.background_color)

        # Set the display image
        self.display.set_image(resized)

        # Actually show it
        self.display.show()

        