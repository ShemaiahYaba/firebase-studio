import Link from 'next/link';
import { Sigma, LayoutPanelLeft, BookOpenText, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navItems = [
  { href: '/', label: 'Home', icon: <Sigma className="h-5 w-5" /> },
  { href: '/playground', label: 'Playground', icon: <LayoutPanelLeft className="h-5 w-5" /> },
  { href: '/resources', label: 'Resources', icon: <BookOpenText className="h-5 w-5" /> },
];

export function Navbar() {
  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-2xl font-headline font-bold hover:text-accent transition-colors">
            <Sigma className="h-8 w-8 text-accent" />
            MatrixLAB
          </Link>
          
          <nav className="hidden md:flex gap-1">
            {navItems.map((item) => (
              <Button key={item.label} variant="ghost" asChild className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-accent">
                <Link href={item.href} className="flex items-center gap-2">
                  {item.icon}
                  {item.label}
                </Link>
              </Button>
            ))}
          </nav>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-accent">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-primary text-primary-foreground p-0 w-64">
                <div className="p-4">
                   <Link href="/" className="flex items-center gap-2 text-2xl font-headline font-bold mb-4">
                      <Sigma className="h-8 w-8 text-accent" />
                      MatrixLAB
                    </Link>
                </div>
                <nav className="flex flex-col gap-2 p-4">
                  {navItems.map((item) => (
                    <Button key={item.label} variant="ghost" asChild className="text-primary-foreground justify-start hover:bg-primary-foreground/10 hover:text-accent">
                      <Link href={item.href} className="flex items-center gap-2">
                        {item.icon}
                        {item.label}
                      </Link>
                    </Button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
