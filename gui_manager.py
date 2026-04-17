import sys
import random
import os
import numpy as np

from PySide6.QtCore import *
from PySide6.QtWidgets import *
from PySide6.QtGui import *

from PIL.Image import open
from PIL.Image import Image
from PIL.ImageQt import ImageQt

import image_manager

from qt_bridge import *


class GUIManager(QWidget):

    def __init__(self):

        # Assign the image to the default image
        self.image = open("./images/default.png")

        # Connect the external update call to the signal
        # to allow for external calls to the update function (non-GUI)
        bridge.call_update.connect(self.externalUpdate)

        # Initialize parent
        super().__init__()

    @Slot()
    def externalUpdate(self):
        self.update()

    # Draw GUI elements
    def paintEvent(self, event):

        # Redundant check to only draw the image if it's non null
        if(self.image != None):
            self.drawImage(self.image)

        # Call parent paint
        return super().paintEvent(event)

    # Key Press callback
    def keyPressEvent(self, event: QKeyEvent):

        # The key pressed
        key = event.key()

        # If ESC Key
        # Then Exit program
        if(key == Qt.Key.Key_Escape):
            sys.exit()
        
        # Call parent callback
        return super().keyPressEvent(event)
    
    # Set the internal image member
    def setImage(self, image: Image):
        self.image = image

    def setImageFromName(self, filename: str):
        self.image = open(filename)

    # Draw the image onto the GUI
    def drawImage(self, image: Image):

        # If the image is null
        # Then early return
        if(image == None):
            return

        # Create painter instance
        painter = QPainter(self)

        # Lossless paintint
        painter.setRenderHint(QPainter.RenderHint.LosslessImageRendering)

        # Resize the image to fit the GUI
        resized = image_manager.force_dimensions(image, self.width(), self.height())

        # Convert PIL to QImage
        qimage = QImage(ImageQt(resized))

        # Overlay Rectangle, same size as GUI / Image
        image_rect = QRect(0, 0, self.width(), self.height())

        # Actually draw the image onto the GUI
        painter.drawImage(image_rect, qimage)
        
        # Give up the painter resource
        painter.end()
