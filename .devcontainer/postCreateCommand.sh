#! /bin/bash

set -e

echo "Print OS and Tool Versions"
lsb_release -a

git --version
pwsh --version

az version
az bicep version
azd version

docker --version
jq --version
gh --version

echo "postCreateCommand.sh finished!"
