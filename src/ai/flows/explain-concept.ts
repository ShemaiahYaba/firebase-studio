'use server';

/**
 * @fileOverview An AI agent that explains linear algebra concepts based on matrix manipulations.
 *
 * - explainConcept - A function that explains the linear algebra concept.
 * - ExplainConceptInput - The input type for the explainConcept function.
 * - ExplainConceptOutput - The return type for the explainConcept function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainConceptInputSchema = z.object({
  matrix: z
    .string()
    .describe('A matrix represented as a string, e.g., "[[1, 2], [3, 4]]".'),
  manipulation: z
    .string()
    .describe(
      'A description of the manipulation performed on the matrix, e.g., "row swap".'
    ),
  question: z
    .string()
    .describe(
      'The question about the underlying linear algebra concept, e.g., "what does this row swap mean in terms of linear transformations?"'
    ),
});
export type ExplainConceptInput = z.infer<typeof ExplainConceptInputSchema>;

const ExplainConceptOutputSchema = z.object({
  explanation: z.string().describe('The explanation of the linear algebra concept.'),
});
export type ExplainConceptOutput = z.infer<typeof ExplainConceptOutputSchema>;

export async function explainConcept(input: ExplainConceptInput): Promise<ExplainConceptOutput> {
  return explainConceptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainConceptPrompt',
  input: {schema: ExplainConceptInputSchema},
  output: {schema: ExplainConceptOutputSchema},
  prompt: `You are an expert linear algebra professor.

  A student has manipulated a matrix and is asking for an explanation of the underlying linear algebra concept.

  Here is the matrix:
  {{{matrix}}}

  Here is the manipulation that was performed:
  {{{manipulation}}}

  Here is the student's question:
  {{{question}}}

  Provide a clear and concise explanation of the linear algebra concept.
  `,
});

const explainConceptFlow = ai.defineFlow(
  {
    name: 'explainConceptFlow',
    inputSchema: ExplainConceptInputSchema,
    outputSchema: ExplainConceptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
