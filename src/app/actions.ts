"use server";

import { explainConcept, type ExplainConceptInput, type ExplainConceptOutput } from "@/ai/flows/explain-concept";
import { z } from "zod";

const ExplainActionInputSchema = z.object({
  matrix: z.string().min(1, "Matrix string cannot be empty."),
  manipulation: z.string().min(1, "Manipulation description cannot be empty."),
  question: z.string().min(1, "Question cannot be empty."),
});

export async function getAIExplanation(
  prevState: any,
  formData: FormData
): Promise<{ message: string; explanation?: string; errors?: Record<string, string[]> }> {
  const rawFormData = {
    matrix: formData.get('matrix'),
    manipulation: formData.get('manipulation'),
    question: formData.get('question'),
  };

  const validatedFields = ExplainActionInputSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      message: "Validation failed. Please check your inputs.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const input: ExplainConceptInput = validatedFields.data;

  try {
    const result: ExplainConceptOutput = await explainConcept(input);
    if (result.explanation) {
      return { message: "Explanation received.", explanation: result.explanation };
    } else {
      return { message: "AI could not generate an explanation." };
    }
  } catch (error) {
    console.error("Error calling AI flow:", error);
    return { message: "An error occurred while fetching the explanation." };
  }
}
