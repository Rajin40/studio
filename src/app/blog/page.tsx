
import Container from '@/components/Container';
import ArticleCard from '@/components/ArticleCard';
import { mockArticles, mockCategories } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function BlogPage() {
  // In a real app, you'd fetch articles, possibly filtered by search/category
  const articles = mockArticles;
  const categories = ['All', ...new Set(mockArticles.map(a => a.category))];

  return (
    <Container className="py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline">Our Blog</h1>
        <p className="text-lg text-muted-foreground mt-2">Insights, tips, and stories from the Shopstream team.</p>
      </div>

      {/* Filters and Search */}
      <div className="mb-10 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search articles..." className="pl-10 w-full" />
        </div>
        <Select defaultValue="All">
            <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
                {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
            </SelectContent>
        </Select>
        <Button className="w-full md:w-auto">Search</Button>
      </div>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No articles found.</p>
      )}

      {/* Pagination Placeholder */}
      <div className="mt-12 text-center">
        <Button variant="outline" className="mr-2">Previous</Button>
        <Button variant="outline">Next</Button>
      </div>
    </Container>
  );
}
