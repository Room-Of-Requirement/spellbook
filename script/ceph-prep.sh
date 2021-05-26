#!/usr/bin/env bash

host="$1"
shift

for DISK in "$@"; do
    ssh $host -- sudo sgdisk --zap-all --clear --mbrtogpt "$DISK"
    ssh $host -- sudo sgdisk --zap-all "$DISK"
    ssh $host -- sudo dd if=/dev/zero of="$DISK" bs=1M count=100 oflag=direct,dsync
done

ssh $host -- sh -c 'ls /dev/mapper/ceph-* | xargs -I% -- sudo dmsetup remove %'
ssh $host -- sudo rm -rf /dev/ceph-*
ssh $host -- sudo rm -rf /dev/mapper/ceph-*
ssh $host -- sudo rm -rf /dev/dm-*

ssh $host -- sudo rm -rf /var/lib/rook/

ssh $host -- sudo reboot
