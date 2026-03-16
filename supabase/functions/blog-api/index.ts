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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const pathParts = url.pathname
    .replace(/^\/blog-api\/?/, "")
    .split("/")
    .filter(Boolean);
  const resource = pathParts[0]; // 'media', 'posts'
  const slug = pathParts[1]; // optional slug for GET /posts/:slug

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

      // Validate slug format
      if (!isValidSlug(fileSlug)) {
        return jsonResponse({ error: "Invalid slug format. Use lowercase letters, numbers, and hyphens only." }, 400);
      }

      // Validate type
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        return jsonResponse({ error: "Invalid file type. Allowed: jpg, jpeg, png, webp" }, 400);
      }

      // Validate size (5MB)
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

      // Validate field lengths
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

      // Validate slug format
      if (!isValidSlug(postSlug)) {
        return jsonResponse({ error: "Invalid slug format. Use lowercase letters, numbers, and hyphens only." }, 400);
      }

      // Check slug uniqueness
      const { data: existing } = await supabaseAdmin.from("blog_posts").select("id").eq("slug", postSlug).maybeSingle();

      if (existing) {
        return jsonResponse({ error: "Slug already exists" }, 409);
      }

      const { data, error } = await supabaseAdmin
        .from("blog_posts")
        .insert({
          title: title.trim(),
          slug: postSlug,
          content,
          meta_description: meta_description?.trim() || null,
          focus_keyword: focus_keyword?.trim() || null,
          image_url: image_url || null,
          cta_text: cta_text?.trim() || null,
          published: published ?? false,
        })
        .select("id, slug")
        .single();

      if (error) {
        console.error("Post creation error:", error);
        return jsonResponse({ error: "Failed to create post. Please try again." }, 500);
      }

      return jsonResponse(
        {
          id: data.id,
          slug: data.slug,
          url: `/blog/${data.slug}`,
        },
        201,
      );
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
      // Validate slug format before querying
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
    // GET /blog-api/og/:slug — Open Graph HTML for crawlers
    if (resource === "og" && req.method === "GET" && slug) {
      const { data: post } = await supabaseAdmin
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

      const html = `<!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8" />
      <title>${escapeHtml(title)} | Lalu Blog</title>
      <meta property="og:title" content="${escapeHtml(title)}" />
      <meta property="og:description" content="${escapeHtml(description)}" />
      <meta property="og:image" content="${escapeHtml(imageUrl)}" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="627" />
      <meta property="og:url" content="${escapeHtml(postUrl)}" />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="Lalu Incorporadora" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content="${escapeHtml(imageUrl)}" />
    </head>
    <body></body>
    </html>`;

      return new Response(html, {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "public, max-age=3600",
        },
      });
    }
    return jsonResponse({ error: "Not found" }, 404);
  } catch (err) {
    console.error("Blog API unhandled error:", err);
    return jsonResponse({ error: "Internal server error" }, 500);
  }
});
