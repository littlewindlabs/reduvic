import pkg from "../package.json";

const manifest = {
  action: {
    default_popup: "src/entries/popup/index.html",
  },
  background: {
    service_worker: "src/entries/background/main.ts",
  },
  content_scripts: [
    {
      js: ["src/entries/contentScript/primary/main.ts"],
      css: ["src/assets/contentScript.css"],
      matches: ["*://*/*"],
      run_at: "document_idle",
    },
  ],
  host_permissions: ["*://*/*"],
  options_ui: {
    page: "src/entries/options/index.html",
    open_in_tab: true,
  },
};

export function getManifest(): chrome.runtime.ManifestV3 {
  return {
    author: pkg.author,
    description: pkg.description,
    name: pkg.displayName ?? pkg.name,
    version: pkg.version,
    manifest_version: 3,
    permissions: ["storage"],
    ...manifest,
  };
}
