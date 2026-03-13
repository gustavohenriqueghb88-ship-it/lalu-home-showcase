export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  highlightWord: string;
  description: string;
  image: string;
  date: Date;
  category: string;
  content: {
    type: 'h2' | 'h3' | 'p' | 'list';
    text?: string;
    items?: string[];
  }[];
}

export const blogPosts: BlogPost[] = [];

export const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
