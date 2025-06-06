
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
      <Link href={`/blog/${article.slug}`} className="block group">
        <CardHeader className="p-0">
          <div className="aspect-video relative w-full overflow-hidden">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill // Changed from layout="fill" objectFit="cover" to fill
              style={{ objectFit: "cover" }} // Added for fill
              className="group-hover:scale-105 transition-transform duration-300" // Added zoom effect
              data-ai-hint={article.aiHint || 'blog image'}
              sizes="(max-width: 768px) 90vw, 45vw" // Example sizes
            />
          </div>
        </CardHeader>
      </Link>
      <CardContent className="p-4 flex-grow">
        <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">{article.category}</p>
        <Link href={`/blog/${article.slug}`} className="block">
          <CardTitle className="text-xl font-headline mb-2 leading-tight hover:text-accent transition-colors line-clamp-2">{article.title}</CardTitle> {/* Added line-clamp */}
        </Link>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{article.excerpt}</p>
        <div className="text-xs text-muted-foreground flex items-center space-x-4">
          <span className="flex items-center"><User className="w-3 h-3 mr-1" /> {article.author}</span>
          <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {article.date}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t mt-auto"> {/* Added mt-auto */}
        <Button asChild variant="outline" className="w-full" size="sm">
          <Link href={`/blog/${article.slug}`}>
            Read More
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
