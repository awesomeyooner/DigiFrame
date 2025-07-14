import sys
import random
from PySide6.QtCore import *
from PySide6.QtWidgets import *
from PySide6.QtGui import *

class Gui(QWidget):
    def __init__(self):
        super().__init__()

        self.image = QImage('./images/default.png')

        self.timer = QTimer(self)
        self.timer.timeout.connect(self.update)
        self.timer.start(100)

    def paintEvent(self, event):

        self.drawImage()

        return super().paintEvent(event)

    def keyPressEvent(self, event):
        key = event.key()

        if(key == Qt.Key.Key_Escape):
            sys.exit()
        
        return super().keyPressEvent(event)
    
    def drawImage(self):
        painter = QPainter(self)

        painter.setRenderHint(QPainter.RenderHint.SmoothPixmapTransform)

        scaled = self.image.size().scaled(
            self.size(),
            Qt.AspectRatioMode.KeepAspectRatio
        )

        center_x = (self.width() - scaled.width()) / 2
        center_y = (self.height() - scaled.height()) / 2

        image_rect = QRect(center_x, center_y, scaled.width(), scaled.height())
        painter.drawImage(image_rect, self.image)

app = QApplication([])
widget = Gui()

def show():
    widget.showFullScreen()

def exec():
    app.exec()

