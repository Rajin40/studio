import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('container mx-auto px-1 sm:px-2 lg:px-4', className)}>
      {children}
    </div>
  );
}
