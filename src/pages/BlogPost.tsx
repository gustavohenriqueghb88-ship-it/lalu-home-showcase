import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { ArrowLeft, ArrowRight, Share2, Facebook, Linkedin } from 'lucide-react';
import { blogPosts, months } from '@/data/blogPosts';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const postIndex = blogPosts.findIndex((p) => p.slug === slug);
  const post = blogPosts[postIndex];

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

  const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
  const nextPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;

  const renderTitle = () => {
    const parts = post.title.split(new RegExp(`(${post.highlightWord})`, 'i'));
    return parts.map((part, i) =>
      part.toLowerCase() === post.highlightWord.toLowerCase() ? (
        <span key={i} className="text-secondary">{part}</span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-95" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6 sm:mb-8 flex justify-center">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="text-primary-foreground/60 hover:text-primary-foreground">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary-foreground/40" />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/blog" className="text-primary-foreground/60 hover:text-primary-foreground">Blog</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary-foreground/40" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-primary-foreground/80 max-w-[200px] sm:max-w-none truncate">
                  {post.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <span className="inline-block text-secondary text-xs sm:text-sm font-semibold uppercase tracking-wider mb-3">
            {post.category}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 max-w-4xl mx-auto leading-tight">
            {renderTitle()}
          </h1>
          <p className="text-primary-foreground/70 text-sm sm:text-base">
            {post.date.getDate()} de {months[post.date.getMonth()]} de {post.date.getFullYear()}
          </p>
        </div>
      </section>

      {/* Banner Image */}
      <section className="container mx-auto px-4 -mt-8 sm:-mt-12 relative z-20 mb-10 sm:mb-14">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-xl overflow-hidden shadow-elegant">
            <AspectRatio ratio={16 / 9}>
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </AspectRatio>
            <div className="absolute top-4 left-4 bg-primary text-secondary rounded-lg px-3 py-2 text-center shadow-md">
              <span className="block text-xl font-bold leading-none">{post.date.getDate()}</span>
              <span className="block text-[10px] uppercase tracking-wide mt-0.5">
                {months[post.date.getMonth()]} {post.date.getFullYear()}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="container mx-auto px-4 mb-12 sm:mb-16">
        <div className="max-w-3xl mx-auto space-y-6">
          {post.content.map((block, i) => {
            switch (block.type) {
              case 'h2':
                return <h2 key={i} className="text-xl sm:text-2xl font-bold text-primary mt-10 first:mt-0">{block.text}</h2>;
              case 'h3':
                return <h3 key={i} className="text-lg sm:text-xl font-semibold text-primary mt-6">{block.text}</h3>;
              case 'p':
                return <p key={i} className="text-muted-foreground leading-relaxed text-sm sm:text-base">{block.text}</p>;
              case 'list':
                return (
                  <ul key={i} className="space-y-2 pl-5">
                    {block.items?.map((item, j) => (
                      <li key={j} className="text-muted-foreground text-sm sm:text-base leading-relaxed list-disc marker:text-secondary">
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              default:
                return null;
            }
          })}
        </div>
      </article>

      {/* Social + Navigation */}
      <section className="container mx-auto px-4 mb-12 sm:mb-16">
        <div className="max-w-3xl mx-auto">
          {/* Share */}
          <div className="flex items-center gap-3 mb-8 pb-8 border-b border-border">
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
              <Share2 size={16} /> Compartilhar:
            </span>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
            >
              <Facebook size={16} />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
            >
              <Linkedin size={16} />
            </a>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center gap-4">
            {prevPost ? (
              <Link to={`/blog/${prevPost.slug}`} className="group">
                <Button variant="default" className="gap-2">
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                  <span className="hidden sm:inline">Post Anterior</span>
                  <span className="sm:hidden">Anterior</span>
                </Button>
              </Link>
            ) : <div />}
            {nextPost ? (
              <Link to={`/blog/${nextPost.slug}`} className="group">
                <Button variant="default" className="gap-2">
                  <span className="hidden sm:inline">Próximo Post</span>
                  <span className="sm:hidden">Próximo</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;
