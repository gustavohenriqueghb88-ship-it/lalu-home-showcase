import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const crawlerPatterns = [
  'linkedinbot',
  'facebookexternalhit',
  'facebookcatalog',
  'twitterbot',
  'slackbot',
  'whatsapp',
  'telegrambot',
  'googlebot',
  'bingbot',
  'yandexbot',
  'baiduspider',
  'duckduckbot',
  'rogerbot',
  'embedly',
  'showyoubot',
  'outbrain',
  'pinterestbot',
  'developers.google.com',
  'redditbot',
  'applebot',
  'discordbot',
];

function isCrawler(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return crawlerPatterns.some((pattern) => ua.includes(pattern));
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const slug = url.searchParams.get("slug");
  const siteUrl = "https://lalu-home-showcase.lovable.app";

  if (!slug) {
    return new Response("Missing slug", { status: 400, headers: corsHeaders });
  }

  const userAgent = req.headers.get("user-agent") || "";

  // If not a crawler, redirect to the SPA
  if (!isCrawler(userAgent)) {
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        Location: `${siteUrl}/blog/${slug}`,
      },
    });
  }

  // Crawler: fetch post data and serve static HTML with OG tags
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("title, meta_description, image_url, slug, published_at")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error || !post) {
    return new Response(null, {
      status: 302,
      headers: { ...corsHeaders, Location: `${siteUrl}/blog/${slug}` },
    });
  }

  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const title = post.title || "Lalu Blog";
  const description = post.meta_description || "";
  const imageUrl = post.image_url || "";

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(title)} | Lalu Blog</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:image" content="${escapeHtml(imageUrl)}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="627" />
  <meta property="og:url" content="${escapeHtml(postUrl)}" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="Lalu Incorporadora" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${escapeHtml(imageUrl)}" />
  <link rel="canonical" href="${escapeHtml(postUrl)}" />
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
      ...corsHeaders,
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
});
