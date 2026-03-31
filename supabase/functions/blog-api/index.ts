import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function authenticate(req: Request): boolean {
  const token = Deno.env.get("BLOG_API_TOKEN");
  if (!token) return false;
  const auth = req.headers.get("Authorization");
  return auth === `Bearer ${token}`;
}

function isValidSlug(slug: string): boolean {
  return /^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(slug) && slug.length <= 200;
}

function generateOgHtml(post: {
  title: string;
  meta_description?: string | null;
  image_url?: string | null;
  slug: string;
  published_at?: string | null;
}): string {
  const siteUrl = "https://laluadm.com";
  const title = post.title || "Lalu Blog";
  const description = post.meta_description || "";
  const imageUrl = post.image_url || "";
  const canonicalUrl = `${siteUrl}/artigo/${post.slug}`;
  const redirectUrl = `${siteUrl}/artigo/${post.slug}`;
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
<meta property="og:url" content="${escapeHtml(canonicalUrl)}"/>
<meta property="og:type" content="article"/>
<meta property="og:site_name" content="Lalu - Incorporadora e Administradora de Imóveis"/>
${publishedAt ? `<meta property="article:published_time" content="${escapeHtml(publishedAt)}"/>` : ""}
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="${escapeHtml(title)}"/>
<meta name="twitter:description" content="${escapeHtml(description)}"/>
<meta name="twitter:image" content="${escapeHtml(imageUrl)}"/>
<link rel="canonical" href="${escapeHtml(canonicalUrl)}"/>
</head>
<body>
<script>window.location.replace("${redirectUrl.replace(/"/g, '\\"')}");</script>
<h1>${escapeHtml(title)}</h1>
<p>${escapeHtml(description)}</p>
<p><a href="${escapeHtml(redirectUrl)}">Leia o post completo</a></p>
</body>
</html>`;
}

async function uploadOgHtml(supabaseAdmin: ReturnType<typeof createClient>, slug: string, html: string) {
  const fileName = `${slug}.html`;
  const { error } = await supabaseAdmin.storage
    .from("og-pages")
    .upload(fileName, new Blob([html], { type: "text/html" }), {
      contentType: "text/html; charset=utf-8",
      upsert: true,
    });
  if (error) {
    console.error("OG HTML upload error:", error);
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS" || req.method === "HEAD") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  const url = new URL(req.url);
  const pathParts = url.pathname
    .replace(/^\/blog-api\/?/, "")
    .split("/")
    .filter(Boolean);
  const resource = pathParts[0];
  const slug = pathParts[1];

  const supabaseAdmin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  try {
    // POST /blog-api/media — Upload image
    if (resource === "media" && req.method === "POST") {
      if (!authenticate(req)) return jsonResponse({ error: "Unauthorized" }, 401);

      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      const fileSlug = formData.get("slug") as string | null;

      if (!file || !fileSlug) {
        return jsonResponse({ error: "file and slug are required" }, 400);
      }
      if (!isValidSlug(fileSlug)) {
        return jsonResponse({ error: "Invalid slug format. Use lowercase letters, numbers, and hyphens only." }, 400);
      }

      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        return jsonResponse({ error: "Invalid file type. Allowed: jpg, jpeg, png, webp" }, 400);
      }
      if (file.size > 5 * 1024 * 1024) {
        return jsonResponse({ error: "File too large. Max 5MB" }, 400);
      }

      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
      if (!["jpg", "jpeg", "png", "webp"].includes(ext)) {
        return jsonResponse({ error: "Invalid file extension" }, 400);
      }
      const fileName = `${fileSlug}.${ext}`;
      const arrayBuffer = await file.arrayBuffer();

      const { error: uploadError } = await supabaseAdmin.storage.from("blog-images").upload(fileName, arrayBuffer, {
        contentType: file.type,
        upsert: true,
      });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        return jsonResponse({ error: "Failed to upload image. Please try again." }, 500);
      }

      const { data: publicUrl } = supabaseAdmin.storage.from("blog-images").getPublicUrl(fileName);
      return jsonResponse({ image_url: publicUrl.publicUrl });
    }

    // POST /blog-api/posts — Create post
    if (resource === "posts" && req.method === "POST") {
      if (!authenticate(req)) return jsonResponse({ error: "Unauthorized" }, 401);

      const body = await req.json();
      const { title, slug: postSlug, content, meta_description, focus_keyword, image_url, published, cta_text } = body;

      if (!title || !postSlug || !content) {
        return jsonResponse({ error: "title, slug, and content are required" }, 400);
      }
      if (typeof title !== "string" || title.length > 200) {
        return jsonResponse({ error: "Title must be a string with max 200 characters" }, 400);
      }
      if (typeof content !== "string" || content.length > 100000) {
        return jsonResponse({ error: "Content must be a string with max 100,000 characters" }, 400);
      }
      if (meta_description && (typeof meta_description !== "string" || meta_description.length > 500)) {
        return jsonResponse({ error: "Meta description must be a string with max 500 characters" }, 400);
      }
      if (focus_keyword && (typeof focus_keyword !== "string" || focus_keyword.length > 100)) {
        return jsonResponse({ error: "Focus keyword must be a string with max 100 characters" }, 400);
      }
      if (image_url && (typeof image_url !== "string" || image_url.length > 2000)) {
        return jsonResponse({ error: "Image URL must be a string with max 2000 characters" }, 400);
      }
      if (cta_text && (typeof cta_text !== "string" || cta_text.length > 100)) {
        return jsonResponse({ error: "CTA text must be a string with max 100 characters" }, 400);
      }
      if (!isValidSlug(postSlug)) {
        return jsonResponse({ error: "Invalid slug format. Use lowercase letters, numbers, and hyphens only." }, 400);
      }

      const { data, error } = await supabaseAdmin
        .from("blog_posts")
        .upsert(
          {
            title: title.trim(),
            slug: postSlug,
            content,
            meta_description: meta_description?.trim() || null,
            focus_keyword: focus_keyword?.trim() || null,
            image_url: image_url || null,
            cta_text: cta_text?.trim() || null,
            published: published ?? false,
          },
          { onConflict: "slug" },
        )
        .select("id, slug, title, meta_description, image_url, published_at")
        .single();

      if (error) {
        console.error("Post upsert error:", error);
        return jsonResponse({ error: "Failed to create/update post. Please try again." }, 500);
      }

      // Generate and upload OG HTML to storage
      if (data) {
        const ogHtml = generateOgHtml(data);
        await uploadOgHtml(supabaseAdmin, data.slug, ogHtml);
      }

      return jsonResponse({ id: data.id, slug: data.slug, url: `/artigo/${data.slug}` }, 201);
    }

    // GET /blog-api/posts — List published posts
    if (resource === "posts" && req.method === "GET" && !slug) {
      const { data, error } = await supabaseAdmin
        .from("blog_posts")
        .select("title, slug, meta_description, image_url, published_at")
        .eq("published", true)
        .order("published_at", { ascending: false });

      if (error) {
        console.error("List posts error:", error);
        return jsonResponse({ error: "Failed to retrieve posts." }, 500);
      }
      return jsonResponse(data);
    }

    // GET /blog-api/posts/:slug — Get single post
    if (resource === "posts" && req.method === "GET" && slug) {
      if (!isValidSlug(slug)) {
        return jsonResponse({ error: "Post not found" }, 404);
      }

      const { data, error } = await supabaseAdmin
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();

      if (error) {
        console.error("Get post error:", error);
        return jsonResponse({ error: "Failed to retrieve post." }, 500);
      }
      if (!data) return jsonResponse({ error: "Post not found" }, 404);
      return jsonResponse(data);
    }

    // GET /blog-api/og/:slug — Return OG HTML (kept for backward compat)
    if (resource === "og" && req.method === "GET" && slug) {
      if (!isValidSlug(slug)) {
        return jsonResponse({ error: "Invalid slug" }, 400);
      }

      const { data: post } = await supabaseAdmin
        .from("blog_posts")
        .select("title, meta_description, image_url, slug, published_at")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();

      const html = generateOgHtml(post || { title: "Lalu Blog", slug });
      return new Response(html, {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "public, max-age=3600",
        },
      });
    }

    // POST /blog-api/regenerate-og — Regenerate OG HTML for all published posts
    if (resource === "regenerate-og" && req.method === "POST") {
      if (!authenticate(req)) return jsonResponse({ error: "Unauthorized" }, 401);

      const { data: posts, error } = await supabaseAdmin
        .from("blog_posts")
        .select("title, slug, meta_description, image_url, published_at")
        .eq("published", true);

      if (error) {
        console.error("Regenerate OG error:", error);
        return jsonResponse({ error: "Failed to fetch posts." }, 500);
      }

      let count = 0;
      for (const post of posts || []) {
        const ogHtml = generateOgHtml(post);
        await uploadOgHtml(supabaseAdmin, post.slug, ogHtml);
        count++;
      }

      return jsonResponse({ regenerated: count });
    }

    return jsonResponse({ error: "Not found" }, 404);
  } catch (err) {
    console.error("Blog API unhandled error:", err);
    return jsonResponse({ error: "Internal server error" }, 500);
  }
});
