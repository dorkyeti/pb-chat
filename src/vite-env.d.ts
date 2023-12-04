/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_POCKETBASE_SERVER: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}