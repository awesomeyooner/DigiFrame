# Use the official Ubuntu 24.04 base image
FROM ubuntu:24.04

# Use default Linux Shell
SHELL ["/bin/bash", "-c"]

# Set environment variables
ENV DEBIAN_FRONTEND=noninteractive
ENV LANG=C.UTF-8 LC_ALL=C.UTF-8

# Install dependencies
RUN apt-get update && apt-get install -y \
    sudo \
    wget \
    curl \
    git \
    nano \
    btop \
    neofetch \
    software-properties-common

# Allows Shell access when container is spun up
CMD ["/bin/bash"]

# Username
ARG USERNAME="ubuntu"

# No Password 
RUN echo "${USERNAME} ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Switch to new user
USER ${USERNAME}

# Switch main workspace to $HOME of user
WORKDIR /home/${USERNAME}

# Start doing things below!