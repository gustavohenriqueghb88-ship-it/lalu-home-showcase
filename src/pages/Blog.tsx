import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { blogPosts, months } from '@/data/blogPosts';

const POSTS_PER_PAGE = 6;

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = blogPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-muted py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">
            Blog
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Novidades, dicas e informações sobre o mercado imobiliário e nossos empreendimentos.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {paginatedPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="block">
                <Card className="overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="relative">
                    <AspectRatio ratio={16 / 9}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </AspectRatio>
                    <div className="absolute top-3 left-3 bg-secondary text-secondary-foreground rounded-md px-2.5 py-1.5 text-center leading-tight shadow-md">
                      <span className="block text-xl font-bold leading-none">
                        {post.date.getDate()}
                      </span>
                      <span className="block text-[10px] uppercase tracking-wide mt-0.5">
                        {months[post.date.getMonth()]} {post.date.getFullYear()}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-5 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-bold text-foreground mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base mb-4 line-clamp-3">
                      {post.description}
                    </p>
                    <span className="text-secondary font-semibold text-sm hover:underline transition-smooth">
                      Leia mais →
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 sm:mt-12">
              <Pagination>
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage((p) => Math.max(1, p - 1));
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      />
                    </PaginationItem>
                  )}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        isActive={page === currentPage}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(page);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={
                          page === currentPage
                            ? 'bg-secondary text-secondary-foreground border-secondary'
                            : ''
                        }
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage((p) => Math.min(totalPages, p + 1));
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
