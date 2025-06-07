
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sigma, LayoutPanelLeft, BookOpenText, ArrowRight } from 'lucide-react'; // Removed Lightbulb
import Image from 'next/image';

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
  { title: "EV-EV Crash Course" },
  { title: "EV-EV Visualizations" },
  { title: "Matrix Playground" },
  { title: "Power Method Visualization" },
  { title: "PCA" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 text-center bg-gradient-to-br from-background to-muted rounded-xl shadow-lg overflow-hidden">
        {/* Five Column Backdrop with descriptive text */}
        <div className="absolute inset-0 flex opacity-10">
          {backdropFeatures.map((feature) => (
            <div
              key={feature.title}
              className="group flex-1 border-r border-primary/10 last:border-r-0 flex flex-col items-center justify-center p-3 text-center transition-all duration-300 hover:bg-primary/5"
            >
              <h4 className="text-sm font-medium text-primary/60 break-words group-hover:text-primary group-hover:font-semibold transition-all duration-300">{feature.title}</h4>
            </div>
          ))}
        </div>
        
        <div className="relative container px-4 md:px-6">
          <Sigma className="h-24 w-24 text-primary mx-auto mb-6" />
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 font-headline text-primary">
            Welcome to MatrixLAB
          </h1>
          <p className="max-w-[700px] mx-auto text-lg md:text-xl text-foreground/80 mb-8 font-body">
            From first principles to PCA mastery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-md transition-transform hover:scale-105">
              <Link href="/playground">
                Try It Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-primary border-primary hover:bg-primary/10 shadow-md transition-transform hover:scale-105">
              <Link href="/resources">
                Learn More
              </Link>
            </Button>
          </div>
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
