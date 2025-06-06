"use client";

import { useState } from 'react';
import { MatrixInputForm } from '@/components/matrix/matrix-input-form';
import { MatrixDisplay } from '@/components/matrix/matrix-display';
import { AIExplainer } from '@/components/ai/ai-explainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { DEFAULT_MATRIX_SIZE, createEmptyMatrix, type Matrix } from '@/lib/constants';
import { BarChartBig, Waypoints } from 'lucide-react'; // Icons for placeholders

export default function PlaygroundPage() {
  const [currentMatrix, setCurrentMatrix] = useState<Matrix>(createEmptyMatrix(DEFAULT_MATRIX_SIZE));

  const handleMatrixUpdate = (newMatrix: Matrix) => {
    setCurrentMatrix(newMatrix);
  };

  return (
    <div className="space-y-12">
      <section>
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-bold mb-3 font-headline text-primary">Interactive Matrix Playground</h1>
          <p className="text-xl text-foreground/80 font-body">
            Experiment with matrices, visualize operations, and understand concepts with AI assistance.
          </p>
        </header>
        <MatrixInputForm onMatrixChange={handleMatrixUpdate} initialSize={DEFAULT_MATRIX_SIZE} initialMatrix={currentMatrix} />
      </section>

      <Separator className="my-12 border-primary/20" />

      <section className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-headline text-primary">
                <BarChartBig className="h-7 w-7 text-accent" />
                Current Matrix
              </CardTitle>
              <CardDescription className="font-body">This is the matrix you've entered above.</CardDescription>
            </CardHeader>
            <CardContent>
              <MatrixDisplay matrix={currentMatrix} />
            </CardContent>
          </Card>
          
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-headline text-primary">
                <Waypoints className="h-7 w-7 text-accent" />
                Visualizations & Transformations
              </CardTitle>
              <CardDescription className="font-body">Eigenvalues, eigenvectors, and transformations will be visualized here.</CardDescription>
            </CardHeader>
            <CardContent className="min-h-[200px] flex items-center justify-center bg-muted rounded-md">
              <p className="text-foreground/60 font-body italic">Interactive visualizations coming soon!</p>
            </CardContent>
          </Card>
        </div>

        <div className="sticky top-24"> {/* Make AI explainer sticky on larger screens */}
          <AIExplainer currentMatrix={currentMatrix} />
        </div>
      </section>
    </div>
  );
}
