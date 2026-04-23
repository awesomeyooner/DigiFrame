from inky.auto import auto
from PIL import Image
import util.helpers.image_helper as image_helper


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
            self.set_image(Image.open(DEFAULT_IMAGE))
        # If not
        # Then set the default image to the parameter
        else:
            self.set_image(Image.open(default_image))

    def set_image(self, image: Image.Image):

        # Resize the image if necessary
        self.image = image_helper.force_dimensions(image, self.width, self.height, self.background_color)


    def display_image(self):

        # Set the display image
        self.display.set_image(self.image)

        # Actually show it
        self.display.show()

        