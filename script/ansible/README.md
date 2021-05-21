Install dependencies.

```
ansible-galaxy install -r requirements.yml
```

```
ansible-playbook --check -i ./ansible/inventory.toml ./ansible/setup_node.yaml -K
```

Use `-K` to pass sudo password to ansible.