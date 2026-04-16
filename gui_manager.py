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


class GUIManager(QWidget):

    def __init__(self):
        self.image = open("./images/default.png")

        super().__init__()

    def paintEvent(self, event):

        print("hello world")
        # if(self.image != None):
        self.drawImage(self.image)

        return super().paintEvent(event)

    def keyPressEvent(self, event):
        key = event.key()

        if(key == Qt.Key.Key_Escape):
            sys.exit()
        
        return super().keyPressEvent(event)
    
    def setImage(self, image: Image):
        self.image = image

    def drawImage(self, image: Image):

        if(image == None):
            return

        painter = QPainter(self)

        painter.setRenderHint(QPainter.RenderHint.LosslessImageRendering)

        center_x = (self.width() - image.width) / 2
        center_y = (self.height() - image.height) / 2

        resized = image_manager.force_dimensions(image, self.width(), self.height())

        qimage = QImage(ImageQt(resized))

        image_rect = QRect(center_x, center_y, image.height, image.width)
        painter.drawImage(image_rect, qimage)


app = QApplication([])
widget = GUIManager()

def show():
    widget.showFullScreen()

def exec():
    app.exec()

