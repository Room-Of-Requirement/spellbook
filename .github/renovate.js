module.exports = {
  username: "renovate-release",
  gitAuthor: "Renovate Bot <bot@renovateapp.com>",
  onboarding: false,
  platform: "github",
  repositories: [
    "Room-Of-Requirement/spellbook"
  ],
  enabled: true,
  timezone: "America/Chicago",
  extends: ["config:base"],
  rebaseWhen: "conflicted",
  dependencyDashboard: true,
  dependencyDashboardTitle: "Renovate Dashboard",
  prConcurrentLimit: 0,
  prHourlyLimit: 0,
  assignees: ["jmmaloney4"],
  requiredStatusChecks: null,
  kubernetes: {
    fileMatch: ["cluster/.+\\.yaml$"]
  },
  "helm-values": {
    fileMatch: ["cluster/.+\\.yaml$"]
  },
  regexManagers: [
    // regexManager to read and process HelmReleases and CRDs
    {
      fileMatch: [
        "cluster/.+\\.yaml$"
      ],
      matchStrings: [
        // helm releases
        "registryUrl=(?<registryUrl>.*?)\n *chart: (?<depName>.*?)\n *version: (?<currentValue>.*)\n",
        // cert-manager crd
        "registryUrl=(?<registryUrl>.*?) chart=(?<depName>.*?)\n.*\\/(?<currentValue>.*?)\\/"
      ],
      datasourceTemplate: "helm"
    },
    {
      fileMatch: [
        "cluster/crds/.+\\.yaml$"
      ],
      matchStrings: [
        "registryUrl=(?<registryUrl>.*?) chart=(?<depName>.*?)\n *tag: (?<currentValue>.*)\n",
      ],
      datasourceTemplate: "helm"
    }
  ],
  packageRules: [
    // setup datasources
    {
      matchDatasources: ["helm"],
    },
    // global docker datasource settings
    {
      matchDatasources: ["docker"],
      enabled: true,
      commitMessageTopic: "container image {{depName}}",
      commitMessageExtra: "to {{#if isSingleVersion}}v{{{newVersion}}}{{else}}{{{newValue}}}{{/if}}",
      matchUpdateTypes: ["major", "minor", "patch", "digest"],
    },
    {
      matchUpdateTypes: ["major"],
      labels: ["dep/major"],
    },
    {
      matchUpdateTypes: ["minor"],
      labels: ["dep/minor"],
    },
    {
      matchDatasources: ["docker"],
      matchUpdateTypes: ["digest", "patch", "minor"],
      automerge: true
    },
    {
      matchDatasources: ["helm"],
      matchUpdateTypes: ["patch", "minor"],
      automerge: true
    },
    {
      matchDatasources: ["docker"],
      matchPackagePatterns: ["^ghcr.io/fluxcd/"],
      groupName: "fluxcd-suite",
      additionalBranchPrefix: ""
    },
    {
      matchDatasources: ["docker"],
      matchPackagePatterns: ["^quay.io/metallb/"],
      groupName: "metallb-suite",
      additionalBranchPrefix: ""
    },
    {
      matchDatasources: ["docker", "helm"],
      matchPackagePatterns: ["docker.io/rook/ceph", "rook-ceph"],
      groupName: "rook-ceph",
      additionalBranchPrefix: "",
      automerge: false
    },
    {
      matchDatasources: ["docker"],
      matchPackagePatterns: ["^k8s.gcr.io/sig-storage/csi-"],
      groupName: "csi",
      additionalBranchPrefix: ""
    },
    {
      matchDatasources: ["docker"],
      matchPackageNames: ["docker.io/minio/minio"],
      versioning: "regex:^RELEASE\.(?<major>[0-9][0-9][0-9][0-9])-(?<minor>[0-9][0-9])-(?<patch>[0-9][0-9])T.*Z$"
    }
  ]
}
