
'use server';
/**
 * @fileOverview A simple AI chat flow for customer support on the help page.
 *
 * - chatWithSupport - A function that handles a user's chat message.
 * - ChatWithSupportInputSchema - The input type for the chatWithSupport function.
 * - ChatWithSupportOutputSchema - The return type for the chatWithSupport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const ChatWithSupportInputSchema = z.object({
  userMessage: z.string().describe('The message from the user.'),
});
export type ChatWithSupportInput = z.infer<typeof ChatWithSupportInputSchema>;

export const ChatWithSupportOutputSchema = z.object({
  aiResponse: z.string().describe('The AI assistant\'s response.'),
});
export type ChatWithSupportOutput = z.infer<typeof ChatWithSupportOutputSchema>;

export async function chatWithSupport(input: ChatWithSupportInput): Promise<ChatWithSupportOutput> {
  return helpChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'helpChatPrompt',
  input: {schema: ChatWithSupportInputSchema},
  output: {schema: ChatWithSupportOutputSchema},
  prompt: `You are a friendly and helpful customer support assistant for an e-commerce store named Shopstream.
Your goal is to assist users with their questions about products, orders, shipping, returns, and general help topics.
Be concise and provide clear answers.

User's message: {{{userMessage}}}

Please provide a helpful response.`,
});

const helpChatFlow = ai.defineFlow(
  {
    name: 'helpChatFlow',
    inputSchema: ChatWithSupportInputSchema,
    outputSchema: ChatWithSupportOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    // In a production scenario, you'd want more robust error handling here.
    // For this example, we assume output will be present.
    if (!output) {
        // Consider throwing a more specific error or returning a default message
        throw new Error('AI did not return an output.');
    }
    return output;
  }
);
