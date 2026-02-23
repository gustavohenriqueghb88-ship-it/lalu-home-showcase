import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

function authenticate(req: Request): boolean {
  const token = Deno.env.get('BLOG_API_TOKEN')
  if (!token) return false
  const auth = req.headers.get('Authorization')
  return auth === `Bearer ${token}`
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const url = new URL(req.url)
  const pathParts = url.pathname.replace(/^\/blog-api\/?/, '').split('/').filter(Boolean)
  const resource = pathParts[0] // 'media', 'posts'
  const slug = pathParts[1] // optional slug for GET /posts/:slug

  const supabaseAdmin = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  try {
    // POST /blog-api/media — Upload image
    if (resource === 'media' && req.method === 'POST') {
      if (!authenticate(req)) return jsonResponse({ error: 'Unauthorized' }, 401)

      const formData = await req.formData()
      const file = formData.get('file') as File | null
      const fileSlug = formData.get('slug') as string | null

      if (!file || !fileSlug) {
        return jsonResponse({ error: 'file and slug are required' }, 400)
      }

      // Validate type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
      if (!allowedTypes.includes(file.type)) {
        return jsonResponse({ error: 'Invalid file type. Allowed: jpg, jpeg, png, webp' }, 400)
      }

      // Validate size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        return jsonResponse({ error: 'File too large. Max 5MB' }, 400)
      }

      const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
      const fileName = `${fileSlug}.${ext}`
      const arrayBuffer = await file.arrayBuffer()

      const { error: uploadError } = await supabaseAdmin.storage
        .from('blog-images')
        .upload(fileName, arrayBuffer, {
          contentType: file.type,
          upsert: true,
        })

      if (uploadError) {
        return jsonResponse({ error: uploadError.message }, 500)
      }

      const { data: publicUrl } = supabaseAdmin.storage
        .from('blog-images')
        .getPublicUrl(fileName)

      return jsonResponse({ image_url: publicUrl.publicUrl })
    }

    // POST /blog-api/posts — Create post
    if (resource === 'posts' && req.method === 'POST') {
      if (!authenticate(req)) return jsonResponse({ error: 'Unauthorized' }, 401)

      const body = await req.json()
      const { title, slug: postSlug, content, meta_description, focus_keyword, image_url, published } = body

      if (!title || !postSlug || !content) {
        return jsonResponse({ error: 'title, slug, and content are required' }, 400)
      }

      // Check slug uniqueness
      const { data: existing } = await supabaseAdmin
        .from('blog_posts')
        .select('id')
        .eq('slug', postSlug)
        .maybeSingle()

      if (existing) {
        return jsonResponse({ error: 'Slug already exists' }, 409)
      }

      const { data, error } = await supabaseAdmin
        .from('blog_posts')
        .insert({
          title,
          slug: postSlug,
          content,
          meta_description,
          focus_keyword,
          image_url,
          published: published ?? false,
        })
        .select('id, slug')
        .single()

      if (error) {
        return jsonResponse({ error: error.message }, 500)
      }

      return jsonResponse({
        id: data.id,
        slug: data.slug,
        url: `/blog/${data.slug}`,
      }, 201)
    }

    // GET /blog-api/posts — List published posts
    if (resource === 'posts' && req.method === 'GET' && !slug) {
      const { data, error } = await supabaseAdmin
        .from('blog_posts')
        .select('title, slug, meta_description, image_url, published_at')
        .eq('published', true)
        .order('published_at', { ascending: false })

      if (error) return jsonResponse({ error: error.message }, 500)
      return jsonResponse(data)
    }

    // GET /blog-api/posts/:slug — Get single post
    if (resource === 'posts' && req.method === 'GET' && slug) {
      const { data, error } = await supabaseAdmin
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle()

      if (error) return jsonResponse({ error: error.message }, 500)
      if (!data) return jsonResponse({ error: 'Post not found' }, 404)
      return jsonResponse(data)
    }

    return jsonResponse({ error: 'Not found' }, 404)
  } catch (err) {
    return jsonResponse({ error: 'Internal server error' }, 500)
  }
})
