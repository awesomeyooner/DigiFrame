#!/bin/bash

HOTSPOT_NAME=DigiFrame
PASSWORD=April182025

IFNAME=wlan0

# Create the hotspot
sudo nmcli device wifi hotspot ssid "${HOTSPOT_NAME}" password "${PASSWORD}" ifname "${IFNAME}" 

# Configure autoconnect settings
sudo nmcli connection modify "${HOTSPOT_NAME}" connection.autoconnect yes connection.autoconnect-priority 100
