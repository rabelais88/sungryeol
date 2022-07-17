#!/bin/bash

case ${1:-up} in
    "up") mutagen-compose -f .devcontainer/docker-compose.yml up --detach;;
    "down") mutagen-compose -f .devcontainer/docker-compose.yml down;;
    "build") mutagen-compose -f .devcontainer/docker-compose.yml up --build --detach;;
esac