# config-service

This repo contains a config service which reads config files either in JSON or properties format and merges them recursively (more specific overrides more general). The data is then provided via a webserver.


It can just be started by running
npm install
node app.js

# environment variables:
CONFIG_DIR: the directory where the configs are stored
PORT: the port of the webserver; default: 3000
ENVIRONMENT: the stage where the application is deployed; default: production. If set to an invalid value, the stage specific files are not read

# example
CONFIG_DIR=example-config/ ENVIRONMENT=development node app.js