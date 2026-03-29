/// <reference types="@remix-run/dev/vite/env.d.ts" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LINKS_JSON_URL: string
  readonly VITE_PROJECTS_JSON_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
