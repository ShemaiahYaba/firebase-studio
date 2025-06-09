
"use client"; 

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sigma, LayoutPanelLeft, BookOpenText, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: <LayoutPanelLeft className="h-10 w-10 text-accent" />,
    title: "Interactive Playground",
    description: "Visualize eigenvalues, eigenvectors, and matrix transformations in real-time. Supports matrices up to 4x4.",
    link: "/playground"
  },
  {
    icon: <BookOpenText className="h-10 w-10 text-accent" />,
    title: "Educational Resources",
    description: "Access tutorials and step-by-step guides to deepen your understanding of linear algebra.",
    link: "/resources"
  },
];

const backdropFeatures = [
  { title: "EV-EV Crash Course", description: "Eigenvalues & Eigenvectors: Like VIPs, they keep their direction under transformation! Uncover their secrets." },
  { title: "EV-EV Visualizations", description: "See the matrix's 'personality' – how it stretches, squashes, and rotates space. A visual feast!" },
  { title: "Matrix Playground", description: "Your sandbox for matrix math. Experiment freely. No actual sand, we promise (it gets everywhere)." },
  { title: "Power Method", description: "Iteratively unmasking the 'strongest' eigenvector, one powerful step at a time! Feel the dominance." },
  { title: "PCA", description: "Principal Component Analysis: Finding the essence of your data, like a digital Marie Kondo! Spark joy with dimensions." },
];

export default function HomePage() {
  const [expandedColumnIndex, setExpandedColumnIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section
        className="relative w-full py-20 md:py-32 text-center bg-gradient-to-br from-background to-muted rounded-xl shadow-lg overflow-hidden"
        onMouseLeave={() => setExpandedColumnIndex(null)}
      >
        {/* Five Column Backdrop */}
        <div className="absolute inset-0 flex">
          {backdropFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className={cn(
                "group flex flex-col items-center p-3 text-center border-r border-primary/10 last:border-r-0 relative", 
                "transition-all duration-500 ease-in-out",
                expandedColumnIndex === null ? "flex-1 justify-start pt-6 opacity-60" : "",
                expandedColumnIndex === index
                  ? "flex-grow-[5] bg-background/95 opacity-100 z-10 justify-start pt-6" 
                  : "",
                expandedColumnIndex !== null && expandedColumnIndex !== index
                  ? "flex-grow-[0] opacity-0 scale-90 w-0 p-0 border-0 overflow-hidden" 
                  : ""
              )}
            >
              <h4 className={cn(
                "font-bold break-words transition-all duration-300 text-sm",
                expandedColumnIndex === index ? "opacity-0" : "filter blur-[1.5px]", 
                expandedColumnIndex === null ? "text-primary/80" : "text-primary"
              )}>
                {feature.title}
              </h4>

              <div
                onMouseEnter={() => setExpandedColumnIndex(index)}
                className="absolute bottom-0 left-0 w-full h-1/2 cursor-pointer z-0"
                aria-label={`Expand ${feature.title}`}
              />

              {expandedColumnIndex === index && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-background/90 transition-opacity duration-300 ease-in-out">
                  <h4 className="text-primary text-xl mb-2 font-bold filter-none">
                    {feature.title}
                  </h4>
                  <p className="text-xs md:text-sm text-foreground/80 opacity-100 px-2 max-w-xs mx-auto mb-4">
                    {feature.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mt-auto pt-4">
                    <Button asChild size="md" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-md transition-transform hover:scale-105">
                      <Link href="/playground">
                        Try It Now <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="md" className="text-primary border-primary hover:bg-primary/10 shadow-md transition-transform hover:scale-105">
                      <Link href="/resources">
                        Learn More
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className={cn(
          "relative container px-4 md:px-6 transition-opacity duration-300 ease-in-out z-20", 
          expandedColumnIndex !== null ? "opacity-0 pointer-events-none" : "opacity-100"
        )}>
          <Sigma className="h-24 w-24 text-primary mx-auto mb-6" />
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 font-headline text-primary">
            Welcome to MatrixLAB
          </h1>
          <p className="max-w-[700px] mx-auto text-lg md:text-xl text-foreground/80 mb-8 font-body">
            from first principles to pca mastery.
          </p>
          {/* Original CTAs removed from here */}
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <h2 className="text-4xl font-bold tracking-tight text-center mb-12 font-headline text-primary">
            Explore MatrixLAB's Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
                <CardHeader className="items-center text-center bg-card">
                  {feature.icon}
                  <CardTitle className="mt-4 text-2xl font-headline text-primary">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow text-center">
                  <CardDescription className="text-foreground/80 font-body">{feature.description}</CardDescription>
                </CardContent>
                <div className="p-6 pt-0 mt-auto text-center">
                   <Button asChild variant="link" className="text-accent hover:text-accent/80">
                     <Link href={feature.link}>
                       Get Started <ArrowRight className="ml-2 h-4 w-4" />
                     </Link>
                   </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Section (Placeholder) */}
      <section className="w-full py-16 md:py-24 bg-muted rounded-xl shadow-lg">
        <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold tracking-tight mb-6 font-headline text-primary">
              Visualize Complex Math
            </h2>
            <p className="text-lg text-foreground/80 mb-6 font-body">
              MatrixLAB provides a dynamic environment to see matrix operations and their geometric interpretations come to life. Understand abstract concepts through hands-on interaction.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
              <Link href="/playground">
                Explore Visualizations
              </Link>
            </Button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <Image 
              src="https://placehold.co/600x400.png" 
              alt="Matrix Visualization Placeholder" 
              width={600} 
              height={400} 
              className="rounded-lg shadow-2xl"
              data-ai-hint="abstract geometric" 
            />
          </div>
        </div>
      </section>
    </div>
  );
}

