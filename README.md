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

# Install w/ kube-vip

First install on one node, setup flux and kube-vip, and then install on the other nodes, using vip as api address.

```
k3sup install --user k3s --ip 192.168.1.20 --cluster --tls-san 192.168.1.250 --k3s-extra-args '--disable traefik --disable servicelb'
mv ./kubeconfig ~/.kube/config
```

### SOPS
```
gpg --export-secret-keys --armor 331FF9DE87B750522D8DBCCA98CC713C919CE8D5 > sops.asc
kubectl create ns flux-system
kubectl create secret generic sops-gpg --namespace=flux-system --from-file=sops.asc
rm sops.asc
```

### Flux

```
flux bootstrap github --owner=Room-Of-Requirement --repository=spellbook --branch deploy --path=cluster/base
```

PAT needs `repo` permissions.

```
kubectl get pods --all-namespaces --watch
```

Once kube-vip is running, replace IP in `~/.kube/config`.

### Join other nodes

```
k3sup join --user k3s --ip 192.168.1.21 --server-user k3s --server-ip 192.168.1.250 --server --k3s-extra-args '--disable traefik --disable servicelb'
```

# Media setup

Need to port forward services locally to setup url base on jackett, radarr, sonarr.

### Radarr

Add indexer in radarr, following instructions in jackett, but using following host/url.

```
http://jackett.media.svc.cluster.local:9117/api/v2.0/indexers/torrentleech/results/torznab/
```

Add download client transmission, with host

```
movies-transmission.media.svc.cluster.local
```

and port `80`.