// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GitHub Pages builds set VITE_BASE_PATH (e.g. "/my-repo/") and STATIC_EXPORT=true.
// Locally and on Lovable hosting both are unset, so nothing changes.
const basePath = process.env["VITE_BASE_PATH"] || "/";
const staticExport = process.env["STATIC_EXPORT"] === "true";

export default defineConfig({
  // Static export (GitHub Pages) skips the server deploy target entirely.
  ...(staticExport ? { nitro: false as const } : {}),
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(staticExport
      ? {
          prerender: {
            enabled: true,
            crawlLinks: true,
          },
          pages: [{ path: "/" }, { path: "/drip" }],
        }
      : {}),
  },
  vite: {
    base: basePath,
  },
});
