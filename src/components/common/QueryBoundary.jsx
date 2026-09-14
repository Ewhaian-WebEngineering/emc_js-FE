import { Suspense } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import LoadingScreen from './LoadingScreen';
import ErrorScreen from './ErrorScreen';
import NotFoundScreen from './NotFoundScreen';

const isNotFoundError = (error) => {
  const status = error?.status;

  return status === 404 || status === 400;
};

export function QueryBoundary({
  children,
  notFoundText = '존재하지 않는 페이지예요',
}) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ error, resetErrorBoundary }) =>
            isNotFoundError(error) ? (
              <NotFoundScreen text={notFoundText} />
            ) : (
              <ErrorScreen onRetry={resetErrorBoundary} />
            )
          }
        >
          <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
