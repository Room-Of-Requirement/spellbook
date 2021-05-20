#!/bin/bash

flux bootstrap github \
  --owner=Room-Of-Requirement \
  --repository=spellbook \
  --branch=main \
  --path=./cluster/
