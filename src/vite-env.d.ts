/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly VITE_STUDENT_EMAIL_DOMAIN?: string;
  readonly VITE_SUPPORT_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** KaTeX's chemistry extension (\ce{H2SO4}): imported for its effect, it adds \ce and \pu to KaTeX. */
declare module 'katex/contrib/mhchem';
