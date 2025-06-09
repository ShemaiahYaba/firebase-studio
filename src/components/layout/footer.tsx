"use client";

import { useState, useEffect } from 'react';

export function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-primary text-primary-foreground py-6 shadow-inner mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm font-body">
          &copy; {year !== null ? year : new Date().getFullYear()} MatrixLAB. All rights reserved.
        </p>
        <p className="text-xs font-body mt-1">
          An interactive way to learn Linear Algebra.
        </p>
      </div>
    </footer>
  );
}
