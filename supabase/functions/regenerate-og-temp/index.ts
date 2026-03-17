import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function generateOgHtml(post: { title: string; meta_description?: string | null; image_url?: string | null; slug: string; published_at?: string | null }): string {
  const siteUrl = "https://laluadm.com";
  const title = post.title || "Lalu Blog";
  const description = post.meta_description || "";
  const imageUrl = post.image_url || "";
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const publishedAt = post.published_at ? new Date(post.published_at).toISOString() : "";

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8"/>
<title>${escapeHtml(title)} | Lalu Blog</title>
<meta name="description" content="${escapeHtml(description)}"/>
<meta property="og:title" content="${escapeHtml(title)}"/>
<meta property="og:description" content="${escapeHtml(description)}"/>
<meta property="og:image" content="${escapeHtml(imageUrl)}"/>
<meta property="og:image:width" content="1200"/>
<meta property="og:image:height" content="627"/>
<meta property="og:url" content="${escapeHtml(postUrl)}"/>
<meta property="og:type" content="article"/>
<meta property="og:site_name" content="Lalu - Incorporadora e Administradora de Imóveis"/>
${publishedAt ? `<meta property="article:published_time" content="${escapeHtml(publishedAt)}"/>` : ""}
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="${escapeHtml(title)}"/>
<meta name="twitter:description" content="${escapeHtml(description)}"/>
<meta name="twitter:image" content="${escapeHtml(imageUrl)}"/>
<link rel="canonical" href="${escapeHtml(postUrl)}"/>
</head>
<body>
<script>window.location.replace("${postUrl.replace(/"/g, '\\"')}");</script>
<h1>${escapeHtml(title)}</h1>
<p>${escapeHtml(description)}</p>
<p><a href="${escapeHtml(postUrl)}">Leia o post completo</a></p>
</body>
</html>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const supabaseAdmin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  const { data: posts, error } = await supabaseAdmin
    .from("blog_posts")
    .select("title, slug, meta_description, image_url, published_at")
    .eq("published", true);

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });

  let count = 0;
  for (const post of posts || []) {
    const html = generateOgHtml(post);
    const { error: upErr } = await supabaseAdmin.storage.from("og-pages").upload(`${post.slug}.html`, new Blob([html], { type: "text/html" }), { contentType: "text/html; charset=utf-8", upsert: true });
    if (upErr) console.error(upErr);
    else count++;
  }

  return new Response(JSON.stringify({ regenerated: count }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
});
