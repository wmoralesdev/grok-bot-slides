import { createConvexTransport } from "./convex";
import { createLocalTransport } from "./local";
import type { LiveTransport } from "./types";

type TransportOptions = {
  localOnly?: boolean;
  workspaceSlug?: string;
  convexUrl?: string;
};

export function createLiveTransport({
  localOnly = false,
  workspaceSlug,
  convexUrl,
}: TransportOptions): LiveTransport {
  const requestedNamespace = workspaceSlug?.trim() || "grok-bot-slides";
  const validNamespace = /^[a-z0-9][a-z0-9-]{0,79}$/.test(requestedNamespace);
  const namespace = validNamespace ? requestedNamespace : "grok-bot-slides";

  // A standalone deck must not construct a remote client, even with Convex configured.
  if (localOnly) return createLocalTransport(namespace, "");
  if (!validNamespace)
    return createLocalTransport(
      namespace,
      "VITE_WORKSPACE_SLUG no es válido. Usa letras minúsculas, números y guiones. Modo local activo.",
    );
  const url = convexUrl?.trim();
  if (url) {
    try {
      return createConvexTransport(url, namespace);
    } catch {
      return createLocalTransport(
        namespace,
        "No ha sido configurado Convex. VITE_CONVEX_URL no es válida; modo local activo.",
      );
    }
  }
  return createLocalTransport(namespace);
}
