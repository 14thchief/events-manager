import { ReactNode, Suspense } from "react";
import { useLocation } from "react-router";
import SuspenseElement from "../components/SuspenseElement";
import { ErrorBoundary } from "react-error-boundary";

const RouteWrapper = ({ children }) => {
  const location = useLocation();

  return (
    <ErrorBoundary resetKeys={[location.pathname]}>
      <Suspense fallback={<SuspenseElement />}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default RouteWrapper;
