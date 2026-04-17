from PySide6.QtCore import QObject, Signal, Slot
from PySide6.QtWidgets import QApplication, QWidget
from flask import Flask
import threading


class Bridge(QObject):
    call_update = Signal()

bridge = Bridge()