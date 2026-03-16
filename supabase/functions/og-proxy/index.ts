import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS" || req.method === "HEAD") {
    return new Response(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  const url = new URL(req.url);
  const slug = url.pathname.replace(/^\/og-proxy\/?/, "").replace(/^\//, "").split("/")[0];

  if (!slug || !/^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(slug)) {
    return new Response("Not found", { status: 404 });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { data: post } = await supabase
    .from("blog_posts")
    .select("title, meta_description, image_url, slug, published_at")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  const siteUrl = "https://laluadm.com";
  const title = post?.title || "Lalu Blog";
  const description = post?.meta_description || "";
  const imageUrl = post?.image_url || "";
  const postUrl = `${siteUrl}/blog/${slug}`;
  const publishedAt = post?.published_at ? new Date(post.published_at).toISOString() : "";

  const html = `<!DOCTYPE html>
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
<h1>${escapeHtml(title)}</h1>
<p>${escapeHtml(description)}</p>
<p><a href="${escapeHtml(postUrl)}">Leia o post completo</a></p>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
});
