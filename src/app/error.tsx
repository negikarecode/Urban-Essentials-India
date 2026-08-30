'use client';

import React, { useEffect } from 'react';
import { ErrorState } from '@/components/feedback/ErrorState';
import { Container } from '@/components/ui/Container';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Router Caught Error:', error);
  }, [error]);

  return (
    <Container className="py-20 flex items-center justify-center min-h-[60vh]">
      <ErrorState
        title="We encountered an issue"
        message={error?.message || 'Something went wrong while loading this page.'}
        onRetry={() => reset()}
      />
    </Container>
  );
}
