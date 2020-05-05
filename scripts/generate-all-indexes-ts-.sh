#!/bin/bash

NODE_MODULE_BIN_PATH="node_modules/.bin"
SCRIPT_PATH="scripts/generate-index-ts.sh"
BASE_PATH="src/app"
CORE_MODULE_PATH="${BASE_PATH}/core"
VIEWS_MODULE_PATH="${BASE_PATH}/views"
SHARED_MODULE_PATH="${BASE_PATH}/shared"

# Core module
${SCRIPT_PATH} -p="${CORE_MODULE_PATH}/services" -e="service.ts"
${SCRIPT_PATH} -p="${CORE_MODULE_PATH}/states" -e="state.ts"

# Views module
${SCRIPT_PATH} -p="${VIEWS_MODULE_PATH}" -e="component.ts"

# Shared module
${SCRIPT_PATH} -p="${SHARED_MODULE_PATH}/enums" -e="enum.ts"
${SCRIPT_PATH} -p="${SHARED_MODULE_PATH}/functions" -e="functions.ts"
${SCRIPT_PATH} -p="${SHARED_MODULE_PATH}/interfaces" -e="interface.ts"
${SCRIPT_PATH} -p="${SHARED_MODULE_PATH}/types" -e="type.ts"
${SCRIPT_PATH} -p="${SHARED_MODULE_PATH}/consts" -e="const.ts"

./${NODE_MODULE_BIN_PATH}/eslint "**/index.ts" --fix
./${NODE_MODULE_BIN_PATH}/prettier "**/index.ts"