#!/bin/bash

kubectl apply --kustomize=./cluster/base/flux-system
kubectl apply --kustomize=./cluster/base/flux-system
