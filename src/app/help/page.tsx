
"use client";

import { useState } from 'react'; // Added useState
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
import { Input } from '@/components/ui/input'; // Added Input
import { useToast } from '@/hooks/use-toast'; // Added useToast
import { chatWithSupport, type ChatWithSupportInput } from '@/ai/flows/helpChatFlow'; // Added chat flow
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai' | 'error';
  text: string;
}


export default function HelpPage() {
  const [isChatActive, setIsChatActive] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoadingAiResponse, setIsLoadingAiResponse] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMsgId = `msg-${Date.now()}-user`;
    const newUserMessage: ChatMessage = { id: userMsgId, type: 'user', text: currentMessage };
    setChatMessages(prev => [...prev, newUserMessage]);
    const messageToSend = currentMessage;
    setCurrentMessage('');
    setIsLoadingAiResponse(true);

    try {
      const input: ChatWithSupportInput = { userMessage: messageToSend };
      const response = await chatWithSupport(input);
      const aiMsgId = `msg-${Date.now()}-ai`;
      setChatMessages(prev => [...prev, { id: aiMsgId, type: 'ai', text: response.aiResponse }]);
    } catch (error) {
      console.error("Error calling chat flow:", error);
      const errorMsgId = `msg-${Date.now()}-error`;
      const errorMessageText = error instanceof Error ? error.message : "Sorry, I couldn't process that. Please try again.";
      setChatMessages(prev => [...prev, {id: errorMsgId, type: 'error', text: errorMessageText }]);
      toast({ title: "Chat Error", description: "Could not get AI response.", variant: "destructive" });
    } finally {
      setIsLoadingAiResponse(false);
    }
  };


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
              
              {/* AI Chatbot Section */}
              <div className="pt-6 mt-6 border-t">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Bot className="h-6 w-6 text-primary mr-2" /> AI Powered Chat Support
                </h3>
                {!isChatActive ? (
                  <>
                    <p className="text-muted-foreground mb-4">
                      Have a quick question? Our AI assistant is here to help you 24/7.
                    </p>
                    <Button variant="outline" onClick={() => setIsChatActive(true)}>
                      <MessageSquare className="mr-2 h-4 w-4" /> Start Chat with AI
                    </Button>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="max-h-72 h-72 overflow-y-auto space-y-3 p-4 border rounded-md bg-muted/30 flex flex-col">
                      {chatMessages.length === 0 && <p className="text-sm text-muted-foreground m-auto">Ask a question to get started...</p>}
                      {chatMessages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div
                            className={cn(
                              "max-w-[80%] p-2.5 rounded-lg shadow-sm text-sm",
                              msg.type === 'user' && "bg-primary text-primary-foreground",
                              msg.type === 'ai' && "bg-card text-card-foreground border",
                              msg.type === 'error' && "bg-destructive text-destructive-foreground border border-destructive/50"
                            )}
                          >
                            {msg.text}
                          </div>
                        </div>
                      ))}
                      {isLoadingAiResponse && (
                        <div className="flex justify-start">
                           <div className="max-w-[80%] p-2.5 rounded-lg shadow-sm text-sm bg-card text-card-foreground border italic">
                            Typing...
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 items-center">
                      <Input
                        type="text"
                        placeholder="Type your message..."
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        onKeyPress={(e) => { if (e.key === 'Enter' && !isLoadingAiResponse) handleSendMessage(); }}
                        disabled={isLoadingAiResponse}
                        className="flex-grow"
                        aria-label="Chat message input"
                      />
                      <Button onClick={handleSendMessage} disabled={isLoadingAiResponse || !currentMessage.trim()}>
                        Send
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => { setIsChatActive(false); setChatMessages([]); setCurrentMessage(''); }} className="text-xs text-muted-foreground hover:text-primary">End Chat</Button>
                  </div>
                )}
              </div>

            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Container>
  );
}
