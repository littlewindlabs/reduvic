import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import webExtension from "@samrum/vite-plugin-web-extension";
import path from "path";
import { getManifest } from "./src/manifest";

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      svelte(),
      webExtension({
        manifest: getManifest(),
        useDynamicUrlWebAccessibleResources: false,
      }),
    ],
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src"),
      },
    },
  };
});


// export default defineConfig(( {command, mode} ) => {
//   const env = loadEnv(mode, process.cwd())
//   if (mode === "firefox") {
//     return {
//       plugins: [
//         svelte(),
//         webExtension({
//           manifest: getManifestFirefox(),
//         }),
//       ],
//       resolve: {
//         alias: {
//           "~": path.resolve(__dirname, "./src"),
//         },
//       },
//     };
//   }
//   else if (mode === "chromium") {
//     return {
//       plugins: [
//         svelte(),
//         webExtension({
//           manifest: getManifestChrome(),
//         }),
//       ],
//       resolve: {
//         alias: {
//           "~": path.resolve(__dirname, "./src"),
//         },
//       },
//     };
//   }
// });
