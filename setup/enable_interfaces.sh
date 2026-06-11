#!/bin/bash

echo "Enabling i2c..."
sudo raspi-config nonint do_i2c 0
echo "Done!"

echo "Enabling SPI..."
sudo raspi-config nonint do_spi 0
echo "Done!"

FIRMWARE_FILE="/boot/firmware/config.txt"
DISABLE_SPI_CS="dtoverlay=spi0-0cs"

echo "Checking to see if SPI CS is disabled..."

# If the SPI CS is already disabled
# Then don't do anything
if grep -q ${DISABLE_SPI_CS} ${FIRMWARE_FILE}; then
	echo "SPI CS already disabled."
# If not disabled, then disable it
else
	echo "SPI CS not disabled. Disabling..."
	echo "" | sudo tee -a ${FIRMWARE_FILE} > /dev/null
	echo "# Disables SPI CS, used for Inky Impression" | sudo tee -a ${FIRMWARE_FILE} > /dev/null
	echo ${DISABLE_SPI_CS} | sudo tee -a ${FIRMWARE_FILE} > /dev/null
	echo "Done!"
fi

echo "Please reboot to apply changes!"
