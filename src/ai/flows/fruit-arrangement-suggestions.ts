'use server';
/**
 * @fileOverview A fruit arrangement suggestion AI agent.
 *
 * - fruitArrangementSuggestions - A function that suggests fruit arrangement ideas.
 * - FruitArrangementSuggestionsInput - The input type for the fruitArrangementSuggestions function.
 * - FruitArrangementSuggestionsOutput - The return type for the fruitArrangementSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FruitArrangementSuggestionsInputSchema = z.object({
  preferences: z
    .string()
    .describe('The customer	 preferences for the fruit arrangement.'),
  eventType: z.string().describe('The type of event the arrangement is for.'),
});
export type FruitArrangementSuggestionsInput = z.infer<
  typeof FruitArrangementSuggestionsInputSchema
>;

const FruitArrangementSuggestionsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('A list of inspirational fruit arrangement ideas.'),
});
export type FruitArrangementSuggestionsOutput = z.infer<
  typeof FruitArrangementSuggestionsOutputSchema
>;

export async function fruitArrangementSuggestions(
  input: FruitArrangementSuggestionsInput
): Promise<FruitArrangementSuggestionsOutput> {
  return fruitArrangementSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'fruitArrangementSuggestionsPrompt',
  input: {schema: FruitArrangementSuggestionsInputSchema},
  output: {schema: FruitArrangementSuggestionsOutputSchema},
  prompt: `You are a creative fruit arrangement designer. A customer is looking for fruit arrangement ideas for a specific event and has provided some preferences.

Based on the event type: {{{eventType}}} and customer preferences: {{{preferences}}},
generate a list of inspirational fruit arrangement ideas.

Suggestions:`,
});

const fruitArrangementSuggestionsFlow = ai.defineFlow(
  {
    name: 'fruitArrangementSuggestionsFlow',
    inputSchema: FruitArrangementSuggestionsInputSchema,
    outputSchema: FruitArrangementSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
