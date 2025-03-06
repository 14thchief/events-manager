import { ComponentType, ReactNode } from "react";
import {
  ErrorBoundary as ErrorHandler,
  FallbackProps,
} from "react-error-boundary";
import ComponentFallback from "./ComponentFallback";

const ErrorBoundary = ({ children, onReset, resetKeys, fallback }) => {
  const handleError = (error, info) => {
    console.error(error, info);
  };

  return (
    <ErrorHandler
      FallbackComponent={fallback || ComponentFallback}
      onError={handleError}
      onReset={onReset}
      resetKeys={resetKeys || []}
    >
      {children}
    </ErrorHandler>
  );
};

export default ErrorBoundary;
