#!/bin/bash

k3sup install \
  --cluster \
  --k3s-extra-args='--disable traefik' \
  --k3s-channel v1.21.0+k3s1 \
  --user k3s --ip 192.168.1.20

k3sup join \
  --server \
  --k3s-extra-args='--disable traefik' \
  --k3s-channel v1.21.0+k3s1 \
  --user k3s --ip 192.168.1.21 \
  --server-user k3s --server-ip 192.168.1.20

k3sup join \
  --server \
  --k3s-extra-args='--disable traefik' \
  --k3s-channel v1.21.0+k3s1 \
  --user k3s --ip 192.168.1.22 \
  --server-user k3s --server-ip 192.168.1.20

k3sup join \
  --k3s-extra-args='--node-taint RaspberryPi=true:NoSchedule --disable traefik' \
  --k3s-channel v1.21.0+k3s1 \
  --user k3s --ip 192.168.1.23 \
  --server-user k3s --server-ip 192.168.1.20

mv ~/.kube/config ~/.kube/config.bup
mv ./kubeconfig ~/.kube/config

