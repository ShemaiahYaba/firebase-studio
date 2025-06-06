"use client";

import { useFormState, useFormStatus } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Lightbulb, Loader2 } from "lucide-react";
import type { Matrix } from "@/lib/constants";
import { getAIExplanation } from "@/app/actions"; // Server Action

const formSchema = z.object({
  matrixString: z.string().min(1, "Matrix representation is required."),
  manipulation: z.string().min(3, "Manipulation description must be at least 3 characters.").max(200, "Manipulation description max 200 characters."),
  question: z.string().min(10, "Your question must be at least 10 characters.").max(300, "Question max 300 characters."),
});

type AIExplainerFormValues = z.infer<typeof formSchema>;

interface AIExplainerProps {
  currentMatrix: Matrix;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-md">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
      Explain Concept
    </Button>
  );
}

export function AIExplainer({ currentMatrix }: AIExplainerProps) {
  const matrixString = JSON.stringify(
    currentMatrix.map(row => 
      row.map(cell => {
        const num = parseFloat(String(cell));
        return isNaN(num) ? 0 : num; // Default non-numeric to 0 for AI
      })
    )
  );

  const form = useForm<AIExplainerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      matrixString: matrixString,
      manipulation: "",
      question: "",
    },
    mode: "onChange",
  });
  
  // Update matrixString in form if currentMatrix changes
  useEffect(() => {
    form.setValue("matrixString", matrixString);
  }, [matrixString, form]);


  const initialState = { message: "", explanation: "", errors: {} };
  const [state, formAction] = useFormState(getAIExplanation, initialState);


  return (
    <Card id="ai-explainer" className="w-full shadow-xl border-accent border-2">
      <CardHeader className="text-center">
        <Lightbulb className="h-12 w-12 text-accent mx-auto mb-2" />
        <CardTitle className="text-3xl font-headline text-primary">AI Concept Explainer</CardTitle>
        <CardDescription className="font-body text-foreground/80">
          Have a question about a matrix operation or concept? Describe it below and let our AI explain!
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form action={formAction}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="matrixString"
              render={({ field }) => (
                <FormItem hidden>
                  <FormLabel>Current Matrix (JSON)</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly name="matrix" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             {/* This input is what gets submitted to the action */}
            <input type="hidden" name="matrix" value={form.getValues("matrixString")} />

            <FormField
              control={form.control}
              name="manipulation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-headline text-primary">Matrix Manipulation Performed</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 'Swapped row 1 and row 2', 'Scaled column 3 by 0.5'" {...field} name="manipulation" className="focus:ring-accent focus:border-accent" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-headline text-primary">Your Question</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., 'What does this row swap mean for the determinant?', 'How does scaling affect eigenvalues?'"
                      className="resize-none focus:ring-accent focus:border-accent"
                      rows={4}
                      {...field}
                      name="question"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <SubmitButton />
            {state?.message && !state.explanation && !state.errors && (
              <p className={`text-sm ${state.explanation ? 'text-green-600' : 'text-red-600'}`}>{state.message}</p>
            )}
            {state?.errors && Object.values(state.errors).flat().map((error, index) => (
                 <p key={index} className="text-sm text-destructive">{error}</p>
            ))}
          </CardFooter>
        </form>
      </Form>
      {state?.explanation && (
        <div className="p-6 border-t">
          <h4 className="text-xl font-semibold mb-3 font-headline text-primary">AI Explanation:</h4>
          <div className="prose prose-sm max-w-none p-4 bg-muted rounded-md shadow font-body whitespace-pre-wrap">
            {state.explanation}
          </div>
        </div>
      )}
    </Card>
  );
}

// Need to add useEffect because the form is a controlled component from react-hook-form
// but the hidden input needs to be updated when currentMatrix prop changes for the server action
import { useEffect } from 'react';
