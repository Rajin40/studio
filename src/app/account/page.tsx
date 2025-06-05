
import Container from '@/components/Container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';

export default function AccountPage() {
  return (
    <Container className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 inline-flex p-3 bg-primary/10 rounded-full text-primary">
              <User className="h-8 w-8" />
            </div>
            <CardTitle className="text-2xl sm:text-3xl font-headline">My Account</CardTitle>
            <CardDescription>Manage your profile, orders, and settings.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground">
              Account details, order history, and settings will be displayed here.
            </p>
            <p className="mt-4 text-sm">
              This page is currently under construction.
            </p>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
