#!/bin/bash

NAME=digiframe
TAG=base

docker run \
    -it \
    --rm \
    --hostname container \
    --name my_container \
    --user $(id -u):$(id -g) \
    --volume "$(pwd)/Documents":/home/ubuntu/Documents \
    --net=host \
    --env DISPLAY=$DISPLAY \
    --env QT_X11_NO_MITSHM=1 \
    --env LIBGL_ALWAYS_INDIRECT=0 \
    --volume /tmp/.X11-unix:/tmp/.X11-unix \
    --volume /dev/input:/dev/input \
    --device-cgroup-rule='c 13:* rmw' \
    ${NAME}:${TAG}