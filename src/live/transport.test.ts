import { beforeEach, describe, expect, it, vi } from "vitest";
import { createLiveTransport } from "./transport";
import { createConvexTransport } from "./convex";
import { createLocalTransport } from "./local";

vi.mock("./convex", () => ({
  createConvexTransport: vi.fn(() => ({ mode: "convex" })),
}));
vi.mock("./local", () => ({
  createLocalTransport: vi.fn(() => ({ mode: "local" })),
}));

beforeEach(() => vi.clearAllMocks());

describe("presentation transport selection", () => {
  const configured = {
    workspaceSlug: "meetup",
    convexUrl: "https://example.convex.cloud",
  };

  it("never constructs a Convex client for standalone decks with a configured URL", () => {
    expect(createLiveTransport({ ...configured, localOnly: true }).mode).toBe("local");
    expect(createConvexTransport).not.toHaveBeenCalled();
    expect(createLocalTransport).toHaveBeenCalledWith("meetup", "");
  });

  it("preserves remote transport for interactive decks", () => {
    expect(createLiveTransport(configured).mode).toBe("convex");
    expect(createConvexTransport).toHaveBeenCalledWith(configured.convexUrl, "meetup");
    expect(createLocalTransport).not.toHaveBeenCalled();
  });

  it("can enter standalone and return to interactive without sharing transports", () => {
    createLiveTransport({ ...configured, localOnly: true });
    createLiveTransport(configured);
    expect(createLocalTransport).toHaveBeenCalledTimes(1);
    expect(createConvexTransport).toHaveBeenCalledTimes(1);
  });

  it("keeps local fallback for an absent or invalid configuration", () => {
    createLiveTransport({});
    expect(createLocalTransport).toHaveBeenCalledWith("grok-bot-slides");
    createLiveTransport({ ...configured, workspaceSlug: "Not valid!" });
    expect(createConvexTransport).not.toHaveBeenCalled();
    expect(createLocalTransport).toHaveBeenLastCalledWith(
      "grok-bot-slides", expect.stringContaining("VITE_WORKSPACE_SLUG no es válido"),
    );
  });

  it("keeps the existing local fallback if the Convex URL cannot create a client", () => {
    vi.mocked(createConvexTransport).mockImplementationOnce(() => {
      throw new Error("Invalid URL");
    });
    expect(createLiveTransport(configured).mode).toBe("local");
    expect(createLocalTransport).toHaveBeenLastCalledWith(
      "meetup", expect.stringContaining("VITE_CONVEX_URL no es válida"),
    );
  });
});
