#!/bin/bash

mpssh -u k3s -f ./inventory.toml -- "/usr/local/bin/k3s-uninstall.sh"
mpssh -u k3s -f ./inventory.toml -- "/usr/local/bin/k3s-agent-uninstall.sh"
