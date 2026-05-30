#!/bin/bash

echo "Enabling i2c..."
sudo raspi-config nonint do_i2c 0
echo "Done!"

echo "Enabling SPI..."
sudo raspi-config nonint do_spi 0
echo "Done!"