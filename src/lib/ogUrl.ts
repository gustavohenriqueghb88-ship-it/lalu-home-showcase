/**
 * Returns the public shareable URL for a blog post.
 * This URL is intercepted by _redirects and serves OG-rich HTML for crawlers,
 * while redirecting human visitors to /artigo/:slug via JavaScript.
 */
export function getOgShareUrl(slug: string): string {
  return `https://laluadm.com/blog/${slug}`;
}
