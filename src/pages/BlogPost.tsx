import { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import DOMPurify from "dompurify";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { ArrowLeft, ArrowRight, Share2, Facebook, Eye } from "lucide-react";
import LinkedInShareButton from "@/components/LinkedInShareButton";
import { getOgShareUrl } from "@/lib/ogUrl";
import { supabase } from "@/integrations/supabase/client";
import { blogPosts as staticPosts, months } from "@/data/blogPosts";

interface DbBlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  meta_description: string | null;
  focus_keyword: string | null;
  image_url: string | null;
  published_at: string | null;
  cta_text: string | null;
  views: number;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  // Try to load from DB
  const { data: dbPost, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts" as any)
        .select("*")
        .eq("slug", slug!)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      return data as unknown as DbBlogPost | null;
    },
    enabled: !!slug,
  });

  // Fallback to static
  const staticIndex = staticPosts.findIndex((p) => p.slug === slug);
  const staticPost = staticPosts[staticIndex];

  const isDbPost = !!dbPost;
  const post = dbPost || staticPost;

  // Increment views once on mount for DB posts
  const viewCounted = useRef(false);
  useEffect(() => {
    if (slug && !viewCounted.current) {
      viewCounted.current = true;
      supabase.rpc('increment_blog_views', { post_slug: slug }).then(({ error }) => {
        if (error) console.error('Failed to increment views:', error);
      });
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center pt-20">
          <div className="text-muted-foreground">Carregando...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary mb-4">Post não encontrado</h1>
            <Link to="/blog">
              <Button variant="default">Voltar ao Blog</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Derive common fields
  const title = isDbPost ? dbPost!.title : staticPost!.title;
  const image = isDbPost ? dbPost!.image_url || "/placeholder.svg" : staticPost!.image;
  const date = isDbPost ? (dbPost!.published_at ? new Date(dbPost!.published_at) : new Date()) : staticPost!.date;

  // SEO / Open Graph
  const siteUrl = "https://laluadm.com";
  const postUrl = `${siteUrl}/blog/${slug}`;
  const ogDescription = isDbPost ? dbPost!.meta_description || "" : "";
  const ogImage = isDbPost ? dbPost!.image_url || "" : "";

  // Static post navigation
  const prevStaticPost = !isDbPost && staticIndex > 0 ? staticPosts[staticIndex - 1] : null;
  const nextStaticPost = !isDbPost && staticIndex < staticPosts.length - 1 ? staticPosts[staticIndex + 1] : null;

  const renderTitle = () => {
    if (isDbPost) return <span>{title}</span>;
    const sp = staticPost!;
    const parts = sp.title.split(new RegExp(`(${sp.highlightWord})`, "i"));
    return parts.map((part, i) =>
      part.toLowerCase() === sp.highlightWord.toLowerCase() ? (
        <span key={i} className="text-secondary">
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      ),
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{title} | Lalu Blog</title>
        <meta name="description" content={ogDescription} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="627" />
        <meta property="og:url" content={postUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Lalu Incorporadora" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={ogDescription} />
        <meta name="twitter:image" content={ogImage} />
        <link rel="canonical" href={postUrl} />
      </Helmet>
      <Header />

      {/* Hero */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-95" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <Breadcrumb className="mb-6 sm:mb-8 flex justify-center">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="text-primary-foreground/60 hover:text-primary-foreground">
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary-foreground/40" />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/blog" className="text-primary-foreground/60 hover:text-primary-foreground">
                    Blog
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary-foreground/40" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-primary-foreground/80 max-w-[200px] sm:max-w-none truncate">
                  {title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 max-w-4xl mx-auto leading-tight">
            {renderTitle()}
          </h1>
          <div className="flex items-center justify-center gap-4 text-primary-foreground/70 text-sm sm:text-base">
            <span>
              {date.getDate()} de {months[date.getMonth()]} de {date.getFullYear()}
            </span>
            {isDbPost && (
              <span className="flex items-center gap-1.5">
                <Eye size={16} />
                {dbPost!.views.toLocaleString('pt-BR')}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Banner Image */}
      <section className="container mx-auto px-4 -mt-8 sm:-mt-12 relative z-20 mb-10 sm:mb-14">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-xl overflow-hidden shadow-elegant">
            <AspectRatio ratio={16 / 9}>
              <img src={image} alt={title} className="w-full h-full object-cover" />
            </AspectRatio>
            <div className="absolute top-4 left-4 bg-primary text-secondary rounded-lg px-3 py-2 text-center shadow-md">
              <span className="block text-xl font-bold leading-none">{date.getDate()}</span>
              <span className="block text-[10px] uppercase tracking-wide mt-0.5">
                {months[date.getMonth()]} {date.getFullYear()}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="container mx-auto px-4 mb-12 sm:mb-16">
        <div className="max-w-3xl mx-auto space-y-6">
          {isDbPost ? (
            <div
              className="prose prose-lg max-w-none text-muted-foreground [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-bold [&_h2]:text-primary [&_h2]:mt-10 [&_h3]:text-lg [&_h3]:sm:text-xl [&_h3]:font-semibold [&_h3]:text-primary [&_h3]:mt-6 [&_p]:leading-relaxed [&_p]:text-sm [&_p]:sm:text-base [&_ul]:space-y-2 [&_ul]:pl-5 [&_li]:list-disc [&_li]:marker:text-secondary [&_a]:text-secondary [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(dbPost!.content) }}
            />
          ) : (
            staticPost!.content.map((block, i) => {
              switch (block.type) {
                case "h2":
                  return (
                    <h2 key={i} className="text-xl sm:text-2xl font-bold text-primary mt-10 first:mt-0">
                      {block.text}
                    </h2>
                  );
                case "h3":
                  return (
                    <h3 key={i} className="text-lg sm:text-xl font-semibold text-primary mt-6">
                      {block.text}
                    </h3>
                  );
                case "p":
                  return (
                    <p key={i} className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                      {block.text}
                    </p>
                  );
                case "list":
                  return (
                    <ul key={i} className="space-y-2 pl-5">
                      {block.items?.map((item, j) => (
                        <li
                          key={j}
                          className="text-muted-foreground text-sm sm:text-base leading-relaxed list-disc marker:text-secondary"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                default:
                  return null;
              }
            })
          )}
        </div>
      </article>

      {/* CTA */}
      <section className="container mx-auto px-4 mb-12 sm:mb-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-hero rounded-xl p-8 sm:p-10 text-center shadow-elegant">
            <h3 className="text-xl sm:text-2xl font-bold text-primary-foreground mb-3">
              Conheça nossos empreendimentos
            </h3>
            <p className="text-primary-foreground/70 mb-6 text-sm sm:text-base">
              Descubra oportunidades únicas de investimento conosco.
            </p>
            <Link to="/empreendimentos" onClick={() => window.scrollTo(0, 0)}>
              <Button variant="secondary" size="lg" className="text-base font-semibold px-8">
                {(isDbPost && dbPost?.cta_text) || "Conhecer Empreendimentos"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Social + Navigation */}
      <section className="container mx-auto px-4 mb-12 sm:mb-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8 pb-8 border-b border-border">
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
              <Share2 size={16} /> Compartilhar:
            </span>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://og.laluadm.com/artigo/${slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
            >
              <Facebook size={16} />
            </a>
            <LinkedInShareButton slug={slug!} />
          </div>

          {!isDbPost && (
            <div className="flex justify-between items-center gap-4">
              {prevStaticPost ? (
                <Link to={`/artigo/${prevStaticPost.slug}`} className="group">
                  <Button variant="default" className="gap-2">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="hidden sm:inline">Post Anterior</span>
                    <span className="sm:hidden">Anterior</span>
                  </Button>
                </Link>
              ) : (
                <div />
              )}
              {nextStaticPost ? (
                <Link to={`/artigo/${nextStaticPost.slug}`} className="group">
                  <Button variant="default" className="gap-2">
                    <span className="hidden sm:inline">Próximo Post</span>
                    <span className="sm:hidden">Próximo</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              ) : (
                <div />
              )}
            </div>
          )}

          {isDbPost && (
            <div className="flex justify-center">
              <Link to="/blog">
                <Button variant="default" className="gap-2">
                  <ArrowLeft size={16} /> Voltar ao Blog
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;
