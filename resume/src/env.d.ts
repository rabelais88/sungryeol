/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly APP_HOST: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
