{
  inputs.nixpkgs.url = "nixpkgs/nixos-unstable";
  inputs.flake-utils.url = "github:numtide/flake-utils";

    outputs = { self, nixpkgs, flake-utils }: flake-utils.lib.eachSystem flake-utils.lib.allSystems (system:
      let
        pkgs = import nixpkgs { inherit system; config.allowUnsupportedSystem = true; };
      in
      {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            ansible
            kubectl
            kubernetes-helm
            sops
          ];
        };
      });
}
