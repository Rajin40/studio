import Image from 'next/image';
import { mockArticles, Article } from '@/lib/data';
import Container from '@/components/Container';
import ArticleCard from '@/components/ArticleCard';
import { Button } from '@/components/ui/button';
import { Calendar, User, MessageSquare, Twitter, Facebook, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

async function getArticle(slug: string): Promise<Article | undefined> {
  return mockArticles.find(a => a.slug === slug);
}

async function getRelatedArticles(currentArticleSlug: string, category?: string): Promise<Article[]> {
  return mockArticles.filter(a => a.slug !== currentArticleSlug && (category ? a.category === category : true)).slice(0, 3);
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  if (!article) {
    return <Container className="py-12 text-center">Article not found.</Container>;
  }

  const relatedArticles = await getRelatedArticles(article.slug, article.category);

  return (
    <Container className="py-8 md:py-12">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <Link href="/blog" className="text-sm text-primary hover:underline mb-2 block">&larr; Back to Blog</Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline mb-3">{article.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center"><User className="w-4 h-4 mr-1.5" /> {article.author}</span>
            <span className="flex items-center"><Calendar className="w-4 h-4 mr-1.5" /> {article.date}</span>
            <span className="flex items-center"><MessageSquare className="w-4 h-4 mr-1.5" /> 0 Comments</span>
          </div>
          <Badge variant="secondary">{article.category}</Badge>
        </header>

        {article.imageUrl && (
          <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg mb-8">
            <Image src={article.imageUrl} alt={article.title} layout="fill" objectFit="cover" data-ai-hint={article.aiHint} priority />
          </div>
        )}

        <div
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {article.tags && article.tags.length > 0 && (
          <div className="mt-8">
            <span className="font-semibold mr-2">Tags:</span>
            {article.tags.map(tag => (
              <Badge key={tag} variant="outline" className="mr-1 mb-1">{tag}</Badge>
            ))}
          </div>
        )}

        {/* Social Sharing Placeholder */}
        <div className="mt-10 py-6 border-t border-b flex items-center justify-between">
          <p className="font-semibold">Share this post:</p>
          <div className="flex space-x-3">
            <Button variant="outline" size="icon" aria-label="Share on Twitter"><Twitter className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon" aria-label="Share on Facebook"><Facebook className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon" aria-label="Share on LinkedIn"><Linkedin className="h-4 w-4" /></Button>
          </div>
        </div>
      </article>

      {/* Comments Section Placeholder */}
      <section className="mt-12 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold font-headline mb-6">Comments</h2>
        <div className="p-6 bg-card rounded-lg shadow">
          <p className="text-muted-foreground text-center">Comments section coming soon. Join the conversation!</p>
          {/* Placeholder for comment form */}
        </div>
      </section>

      {/* Related Posts */}
      {relatedArticles.length > 0 && (
        <section className="py-12 mt-12 border-t">
          <h2 className="text-2xl font-bold font-headline mb-8 text-center">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedArticles.map(related => (
              <ArticleCard key={related.id} article={related} />
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}

export async function generateStaticParams() {
  return mockArticles.map(article => ({
    slug: article.slug,
  }));
}
