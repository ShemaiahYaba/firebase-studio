"use client";

import { useState, useEffect, useCallback } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MatrixCell } from './matrix-cell';
import { createEmptyMatrix, MATRIX_SIZE_OPTIONS, DEFAULT_MATRIX_SIZE, type Matrix } from '@/lib/constants';
import { Trash2, RotateCcw } from 'lucide-react';

interface MatrixInputFormProps {
  initialSize?: number;
  onMatrixChange: (matrix: Matrix) => void;
  initialMatrix?: Matrix;
}

export function MatrixInputForm({ 
  initialSize = DEFAULT_MATRIX_SIZE, 
  onMatrixChange,
  initialMatrix
}: MatrixInputFormProps) {
  const [size, setSize] = useState(initialSize);
  const [matrix, setMatrix] = useState<Matrix>(initialMatrix || createEmptyMatrix(initialSize));

  useEffect(() => {
    if (initialMatrix) {
      setMatrix(initialMatrix);
      setSize(initialMatrix.length);
    } else {
      setMatrix(createEmptyMatrix(size));
    }
  }, [size, initialMatrix]);

  const handleSizeChange = (newSizeValue: string) => {
    const newSize = parseInt(newSizeValue, 10);
    setSize(newSize);
    const newMatrix = createEmptyMatrix(newSize);
    setMatrix(newMatrix);
    onMatrixChange(newMatrix);
  };

  const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
    const newMatrix = matrix.map((row, rIdx) =>
      rIdx === rowIndex
        ? row.map((cell, cIdx) => (cIdx === colIndex ? value : cell))
        : row
    );
    setMatrix(newMatrix);
    onMatrixChange(newMatrix);
  };

  const clearMatrix = useCallback(() => {
    const newMatrix = createEmptyMatrix(size);
    setMatrix(newMatrix);
    onMatrixChange(newMatrix);
  }, [size, onMatrixChange]);

  const resetToDefault = useCallback(() => {
    setSize(DEFAULT_MATRIX_SIZE);
    const newMatrix = createEmptyMatrix(DEFAULT_MATRIX_SIZE);
    setMatrix(newMatrix);
    onMatrixChange(newMatrix);
  }, [onMatrixChange]);


  return (
    <div className="space-y-6 p-6 border rounded-lg shadow-lg bg-card">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Label htmlFor="matrix-size-select" className="text-lg font-headline text-primary">Matrix Size:</Label>
          <Select value={size.toString()} onValueChange={handleSizeChange}>
            <SelectTrigger id="matrix-size-select" className="w-28 h-10 rounded-md shadow-sm focus:ring-accent focus:border-accent">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {MATRIX_SIZE_OPTIONS.map(option => (
                <SelectItem key={option} value={option.toString()}>
                  {option}x{option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" onClick={clearMatrix} className="text-destructive border-destructive hover:bg-destructive/10">
                <Trash2 className="mr-2 h-4 w-4" /> Clear
            </Button>
            <Button variant="outline" onClick={resetToDefault}>
                <RotateCcw className="mr-2 h-4 w-4" /> Reset
            </Button>
        </div>
      </div>

      <div className="grid gap-2 sm:gap-3" style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}>
        {matrix.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <MatrixCell
              key={`cell-${rowIndex}-${colIndex}`}
              value={cell}
              onChange={(value) => handleCellChange(rowIndex, colIndex, value)}
              aria-label={`Matrix cell row ${rowIndex + 1} column ${colIndex + 1}`}
            />
          ))
        )}
      </div>
      <p className="text-sm text-muted-foreground font-body">
        Enter numerical values. For example: 1, -2.5, 0.
      </p>
    </div>
  );
}
