/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_THESPORTSDB_KEY?: string
  readonly VITE_API_BASE_URL?: string
  readonly VITE_SEASON?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
