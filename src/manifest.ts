import pkg from "../package.json";

const manifest = {
  action: {
    default_title: "Click to enable or disable Reduvic"
  },
  background: {
    service_worker: "src/entries/background/main.ts",
    scripts: [ "src/entries/background/main.ts" ],
  },
  content_scripts: [
    {
      js: ["src/entries/contentScript/primary/main.ts"],
      matches: ["<all_urls>"],
      run_at: "document_end",
    },
  ],
  host_permissions: ["<all_urls>"],
  icons: {
    16: "icons/reduvicIcon_16.png",
    19: "icons/reduvicIcon_19.png",
    32: "icons/reduvicIcon_32.png",
    48: "icons/reduvicIcon_48.png",
    128: "icons/reduvicIcon_128.png",
  },
  browser_specific_settings: {
    gecko: {
      id: "reduvic@littlewindlabs.com",
      strict_min_version: "109.0"
    },
  }
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
