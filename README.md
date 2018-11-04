# config-service

This repo contains a config service. It can just be started by running
npm install
node app.js

# environment variables:
CONFIG_DIR: the directory where the configs are stored
PORT: the port of the webserver
ENVIRONMENT: the stage where the application is deployed

# example
CONFIG_DIR=example-config/ ENVIRONMENT=development node app.js