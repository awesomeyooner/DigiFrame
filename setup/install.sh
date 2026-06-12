#!/bin/bash

# Install APT packages
echo "Installing APT packages..."

sudo apt install -y git \
    nano \
    python3-venv \
    python3-pip \
    libopenblas-dev \
    libopenjp2-7

echo "Done!"

# Create Python Venv
echo "Creating Python Virtual Environment at $(pwd)/env"

python -m venv env

echo "Done!"

# Install PIP packages
echo "Installing PIP packages..."

env/bin/pip install -r setup/requirements.txt

echo "Done!"
