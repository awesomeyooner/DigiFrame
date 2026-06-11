#!/bin/bash

echo "Installing APT packages..."

sudo apt install -y git \
    nano \
    python3-venv \
    python3-pip \
    libopenblas-dev

echo "Done!"

