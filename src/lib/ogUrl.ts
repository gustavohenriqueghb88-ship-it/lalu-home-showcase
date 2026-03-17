const SUPABASE_PROJECT_ID = "kktsraavvytjwrtxcexc";

export function getOgShareUrl(slug: string): string {
  return `https://${SUPABASE_PROJECT_ID}.supabase.co/storage/v1/object/public/og-pages/${slug}.html`;
}
