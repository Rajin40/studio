import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <Link href={`/blog/${article.slug}`} className="block">
        <CardHeader className="p-0">
          <div className="aspect-video relative w-full">
            <Image
              src={article.imageUrl}
              alt={article.title}
              layout="fill"
              objectFit="cover"
              data-ai-hint={article.aiHint}
            />
          </div>
        </CardHeader>
      </Link>
      <CardContent className="p-4 flex-grow">
        <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">{article.category}</p>
        <Link href={`/blog/${article.slug}`} className="block">
          <CardTitle className="text-xl font-headline mb-2 leading-tight hover:text-primary transition-colors">{article.title}</CardTitle>
        </Link>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{article.excerpt}</p>
        <div className="text-xs text-muted-foreground flex items-center space-x-4">
          <span className="flex items-center"><User className="w-3 h-3 mr-1" /> {article.author}</span>
          <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {article.date}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button asChild variant="outline" className="w-full">
          <Link href={`/blog/${article.slug}`}>
            Read More
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
