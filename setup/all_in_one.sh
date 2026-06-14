#!/bin/bash

echo "Making scripts executable..."

sudo chmod +x setup/install.sh
sudo chmod +x setup/enable_interfaces.sh
sudo chmod +x setup/add_service.sh
sudo chmod +x setup/hotspot.sh

echo "Done!"

echo "Running all scripts..."

sudo ./setup/install.sh
sudo ./setup/enable_interfaces.sh
sudo ./setup/add_service.sh
sudo ./setup/hotspot.sh

echo "Rebooting..."

sudo reboot

