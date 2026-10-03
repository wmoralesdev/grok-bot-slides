import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { createLiveTransport } from "./transport";
import type { LiveTransport } from "./types";

const LiveContext = createContext<LiveTransport | null>(null);

export function LiveProvider({
  children,
  localOnly = false,
}: {
  children: ReactNode;
  localOnly?: boolean;
}) {
  const [connection, setConnection] = useState<{
    localOnly: boolean;
    transport: LiveTransport;
  } | null>(null);

  useEffect(() => {
    const transport = createLiveTransport({
      localOnly,
      workspaceSlug: import.meta.env.VITE_WORKSPACE_SLUG,
      convexUrl: import.meta.env.VITE_CONVEX_URL,
    });
    setConnection({ localOnly, transport });
    return () => transport.close?.();
  }, [localOnly]);

  // Do not expose the previous route's transport while switching presentation modes.
  if (!connection || connection.localOnly !== localOnly) return null;
  return (
    <LiveContext.Provider value={connection.transport}>
      {children}
    </LiveContext.Provider>
  );
}

export function useLiveTransport(): LiveTransport {
  const value = useContext(LiveContext);
  if (!value) throw new Error("LiveProvider debe envolver la aplicación.");
  return value;
}

export function useLive() {
  const transport = useLiveTransport();
  return {
    mode: transport.mode,
    configurationMessage: transport.configurationMessage,
    createSession: transport.createSession,
  };
}

if (import.meta.hot) {
  // Refresh provider and consumers together when the live transport changes.
  // Session capabilities stay in localStorage, so a reload preserves ownership.
  import.meta.hot.accept(() => window.location.reload());
}
