import React from 'react';

function NotFound({
  error,
  resetErrorBoundary,
}: {
  error?: Error;
  resetErrorBoundary?: () => void;
}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error?.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

export default NotFound;
