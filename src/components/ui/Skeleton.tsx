import React from 'react';
import { cn } from '@/lib/utils';

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-2xl bg-brand-cream-200/80 dark:bg-zinc-800',
        className
      )}
      {...props}
    />
  );
}
