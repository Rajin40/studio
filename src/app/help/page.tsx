
import Container from '@/components/Container';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockFaqs, shippingPolicy, returnPolicy } from '@/lib/data';
import { Mail, Phone, MapPin, Bot, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HelpPage() {
  return (
    <Container className="py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline">Help Center</h1>
        <p className="text-lg text-muted-foreground mt-2">Find answers to your questions and learn more about Shopstream.</p>
      </div>

      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
          <TabsTrigger value="faq">FAQs</TabsTrigger>
          <TabsTrigger value="shipping">Shipping Info</TabsTrigger>
          <TabsTrigger value="returns">Return Policy</TabsTrigger>
          <TabsTrigger value="contact">Contact Us</TabsTrigger>
        </TabsList>

        <TabsContent value="faq">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-headline mb-6 text-center md:text-left">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {mockFaqs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="text-left font-semibold hover:text-primary transition-colors">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </TabsContent>

        <TabsContent value="shipping">
          <div className="max-w-3xl mx-auto prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: shippingPolicy }} />
        </TabsContent>

        <TabsContent value="returns">
           <div className="max-w-3xl mx-auto prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: returnPolicy }} />
        </TabsContent>
        
        <TabsContent value="contact" id="contact">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-headline mb-6 text-center md:text-left">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <Mail className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Email Support</h3>
                  <p className="text-muted-foreground">Reach us at <a href="mailto:support@shopstream.com" className="text-primary hover:underline">support@shopstream.com</a>. We typically respond within 24 hours.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Phone Support</h3>
                  <p className="text-muted-foreground">Call us at <a href="tel:+1234567890" className="text-primary hover:underline">+1 (234) 567-890</a>. Available Mon-Fri, 9 AM - 5 PM EST.</p>
                </div>
              </div>
               <div className="flex items-start space-x-3">
                <MapPin className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Our Address</h3>
                  <p className="text-muted-foreground">123 Shopstream Lane, Commerce City, CC 54321</p>
                </div>
              </div>
              <div className="pt-6 mt-6 border-t">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Bot className="h-6 w-6 text-primary mr-2" /> AI Powered Chat Support
                </h3>
                <p className="text-muted-foreground mb-4">
                  Have a quick question? Our AI assistant is here to help you 24/7.
                </p>
                <Button variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" /> Start Chat with AI
                </Button>
                <p className="text-xs text-muted-foreground mt-3">
                  (This is a placeholder for your AI chatbot integration)
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Container>
  );
}
