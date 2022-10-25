/* eslint-disable no-console */
import { ErrorBoundary as Boundary } from "react-error-boundary";

import { ErrorFallback } from "./error-fallback";

export const ErrorBoundary = ({ children }) => {
  const handleError = (error) => {
    console.error(error);
  };

  return (
    <Boundary FallbackComponent={ErrorFallback} onError={handleError}>
      {children}
    </Boundary>
  );
};
