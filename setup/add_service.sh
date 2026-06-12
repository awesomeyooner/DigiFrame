#!/bin/bash

SERVICE_NAME="digiframe"

SERVICE_FILE="digiframe.service"

SERVICES_PATH="/etc/systemd/system/"

# Copy service file to /etc/systemd/system
echo "Adding .service file to ${SERVICES_PATH}..."

cp setup/digiframe.service ${SERVICES_PATH}${SERVICE_FILE}

echo "Done!"

# Reload SystemCTL Daemon
echo "Reloading Daemon..."

sudo systemctl daemon-reload

echo "Done!"

# Enable the service
echo "Enabling service..."

sudo systemctl enable ${SERVICE_NAME}

echo "Done!"

# Start the service
echo "Starting service..."

sudo systemctl start ${SERVICE_NAME}

echo "Done!"

# Print the status at the end
echo "Printing service status..."

sudo systemctl status ${SERVICE_NAME}