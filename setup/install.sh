#!/bin/bash

echo "Installing APT packages..."

sudo apt install -y git \
    nano \
    python3-venv \
    python3-pip \
    libopenblas-dev \
    libopenjp2-7

echo "Done!"

echo "Creating Python Virtual Environment..."

python -m venv ../venv

echo "Done!"

echo "Installing PIP packages..."

../venv/bin/pip install -r setup/requirements.txt


