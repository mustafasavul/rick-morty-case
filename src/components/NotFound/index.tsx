import React from 'react';
import styles from './index.module.css';

export function NotFound({
                           error,
                           resetErrorBoundary,
                         }: {
  error?: Error;
  resetErrorBoundary?: () => void;
}) {
  return (
      <div className={styles.notFoundAlert}>
        <p className={styles.notFoundMessage}>Something went wrong:</p>
        <pre>{error?.message}</pre>
        <button className={styles.notFoundButton} onClick={resetErrorBoundary}>
          Try again
        </button>
      </div>
  );
}

export default NotFound;
