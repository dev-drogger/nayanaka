declare module "react-error-boundary" {
  import * as React from "react";

  export interface FallbackProps {
    error: Error;
    resetErrorBoundary: (...args: Array<unknown>) => void;
  }

  export interface ErrorBoundaryPropsWithComponent {
    fallback: React.ComponentType<FallbackProps>;
    onError?: (error: Error, info: { componentStack: string }) => void;
    onReset?: (...args: Array<unknown>) => void;
    resetKeys?: Array<unknown>;
    onResetKeysChange?: (
      prevResetKeys: Array<unknown> | undefined,
      resetKeys: Array<unknown> | undefined
    ) => void;
    children?: React.ReactNode;
  }

  export interface ErrorBoundaryPropsWithRender {
    fallbackRender: (props: FallbackProps) => React.ReactNode;
    onError?: (error: Error, info: { componentStack: string }) => void;
    onReset?: (...args: Array<unknown>) => void;
    resetKeys?: Array<unknown>;
    onResetKeysChange?: (
      prevResetKeys: Array<unknown> | undefined,
      resetKeys: Array<unknown> | undefined
    ) => void;
    children?: React.ReactNode;
  }

  export interface ErrorBoundaryPropsWithFallback {
    fallback: React.ReactNode;
    onError?: (error: Error, info: { componentStack: string }) => void;
    onReset?: (...args: Array<unknown>) => void;
    resetKeys?: Array<unknown>;
    onResetKeysChange?: (
      prevResetKeys: Array<unknown> | undefined,
      resetKeys: Array<unknown> | undefined
    ) => void;
    children?: React.ReactNode;
  }

  export type ErrorBoundaryProps =
    | ErrorBoundaryPropsWithFallback
    | ErrorBoundaryPropsWithComponent
    | ErrorBoundaryPropsWithRender;

  export class ErrorBoundary extends React.Component<ErrorBoundaryProps> {}

  export function withErrorBoundary<P extends React.Props<any>>(
    Component: React.ComponentType<P>,
    errorBoundaryProps: ErrorBoundaryProps
  ): React.ComponentType<P>;

  export function useErrorHandler(error?: unknown): (error: unknown) => void;
}
