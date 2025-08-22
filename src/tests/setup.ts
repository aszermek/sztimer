import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import ResizeObserver from "resize-observer-polyfill";

global.ResizeObserver = ResizeObserver;

Element.prototype.scrollIntoView = vi.fn();

afterEach(() => {
    cleanup();
});
