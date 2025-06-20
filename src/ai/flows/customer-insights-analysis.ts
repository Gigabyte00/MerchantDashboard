'use server';

/**
 * @fileOverview AI tool to intelligently group customers by region, spend habits, and contact dates.
 *
 * - customerInsightsAnalysis - A function that handles the customer insights analysis process.
 * - CustomerInsightsAnalysisInput - The input type for the customerInsightsAnalysis function.
 * - CustomerInsightsAnalysisOutput - The return type for the customerInsightsAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CustomerInsightsAnalysisInputSchema = z.object({
  customerData: z
    .string()
    .describe(
      'A string containing customer data, including region, spend habits, and contact dates. It should be structured in a way that is easy for the AI to parse.  For example a CSV format or JSON array.'
    ),
});
export type CustomerInsightsAnalysisInput = z.infer<typeof CustomerInsightsAnalysisInputSchema>;

const CustomerInsightsAnalysisOutputSchema = z.object({
  customerSegments: z
    .string()
    .describe(
      'A description of the identified customer segments, based on region, spend habits, and contact dates.'
    ),
  recommendations: z
    .string()
    .describe(
      'Recommendations for tailoring business decisions based on the identified customer segments.'
    ),
});
export type CustomerInsightsAnalysisOutput = z.infer<typeof CustomerInsightsAnalysisOutputSchema>;

export async function customerInsightsAnalysis(input: CustomerInsightsAnalysisInput): Promise<CustomerInsightsAnalysisOutput> {
  return customerInsightsAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'customerInsightsAnalysisPrompt',
  input: {schema: CustomerInsightsAnalysisInputSchema},
  output: {schema: CustomerInsightsAnalysisOutputSchema},
  prompt: `You are an expert marketing analyst.

You will be provided with customer data, and your job is to identify key segments based on region, spend habits, and contact dates.

Based on these segments, you will provide recommendations for tailoring business decisions.

Customer Data: {{{customerData}}}
`,
});

const customerInsightsAnalysisFlow = ai.defineFlow(
  {
    name: 'customerInsightsAnalysisFlow',
    inputSchema: CustomerInsightsAnalysisInputSchema,
    outputSchema: CustomerInsightsAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);


