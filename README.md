# cluster


### Generate Flux GPG Key

```
gpg --batch --full-generate-key <<EOF
%no-protection
Key-Type: 1
Key-Length: 4096
Subkey-Type: 1
Subkey-Length: 4096
Expire-Date: 0
Name-Real: Room of Requirement <noreply@roomofrequirement.xyz>
EOF
```

Then add it as a secret to the cluster:

```
gpg --export-secret-keys --armor <Fingerprint> |
kubectl create secret generic sops-gpg \
    --namespace=flux-system \
    --from-file=sops.asc=/dev/stdin
```