#!/bin/bash

NAME=digiframe
TAG=base

docker buildx build --load -t ${NAME}:${TAG} .