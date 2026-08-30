import React from 'react';
import { PackageOpen } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export function EmptyState({
  title = 'No items found',
  description = 'There are no records or products matching your criteria.',
  icon,
  actionLabel,
  actionHref,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="py-16 px-4 text-center max-w-md mx-auto space-y-4">
      <div className="w-16 h-16 rounded-3xl bg-brand-cream-200 text-brand-charcoal-400 flex items-center justify-center mx-auto border border-brand-cream-300">
        {icon || <PackageOpen className="w-8 h-8" />}
      </div>

      <div className="space-y-1">
        <h3 className="font-serif font-bold text-lg text-brand-charcoal-900">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-brand-charcoal-500 max-w-xs mx-auto">
          {description}
        </p>
      </div>

      {(actionLabel && actionHref) && (
        <div className="pt-2">
          <Link href={actionHref}>
            <Button size="sm">{actionLabel}</Button>
          </Link>
        </div>
      )}

      {(actionLabel && onAction && !actionHref) && (
        <div className="pt-2">
          <Button size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
