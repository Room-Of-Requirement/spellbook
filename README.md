# The Room of Requirement

Uses [`go-task`](https://taskfile.dev).

### See avaliable tasks

```
task --list
```

### Push local branch to `deploy` branch
```
git push --force origin <local-branch>:deploy
```

## Music

### WvUnpack

```
wvunpack --dsf *.wv
```

### SACD Extract

```
/root/bin/sacd_extract -2szi <file>
```

# Renaming network interface name

https://askubuntu.com/questions/1317036/how-to-rename-a-network-interface-in-20-04

# Ubuntu 22.04 SSH issue

https://github.com/alexellis/k3sup/issues/377#issuecomment-1113966436

Edit `/etc/ssh/sshd_config`, add

```
PubkeyAcceptedKeyTypes=+ssh-rsa
```

# SOPS

```
gpg --export-secret-keys --armor 331FF9DE87B750522D8DBCCA98CC713C919CE8D5 > sops.asc
kubectl create ns flux-system
kubectl create secret generic sops-gpg --namespace=flux-system --from-file=sops.asc
rm sops.asc
```
