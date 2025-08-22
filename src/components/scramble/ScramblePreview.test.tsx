import { describe, it, expect, vi, beforeEach } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { Provider, createStore } from "jotai";
import { ScramblePreview } from "./ScramblePreview";
import { scrambleAtom, isScrambleLoadingAtom } from "@/atoms/scrambleAtoms";
import { selectedEventAtom } from "@/atoms/sessionAtoms";
import { drawScramble } from "@/lib/drawScramble";

vi.mock("@/lib/drawScramble", () => ({
    drawScramble: vi.fn(),
}));

vi.mock("./ScramblePreviewSkeleton", () => ({
    ScramblePreviewSkeleton: () => (
        <div data-testid="scramble-preview-skeleton" />
    ),
}));

describe("ScramblePreview Component", () => {
    let store: ReturnType<typeof createStore>;

    beforeEach(() => {
        store = createStore();
        vi.clearAllMocks(); // Clear mocks before each test
    });

    it("should render the skeleton when isLoading is true", () => {
        store.set(isScrambleLoadingAtom, true);

        render(
            <Provider store={store}>
                <ScramblePreview />
            </Provider>
        );

        expect(
            screen.getByTestId("scramble-preview-skeleton")
        ).toBeInTheDocument();
    });

    it("should render the preview container when not loading", () => {
        store.set(isScrambleLoadingAtom, false);

        render(
            <Provider store={store}>
                <ScramblePreview />
            </Provider>
        );

        expect(
            screen.queryByTestId("scramble-preview-skeleton")
        ).not.toBeInTheDocument();
    });

    it("should call drawScramble with the correct event and scramble on mount", () => {
        store.set(scrambleAtom, "R U R' U'");
        store.set(selectedEventAtom, "333");
        store.set(isScrambleLoadingAtom, false);

        render(
            <Provider store={store}>
                <ScramblePreview />
            </Provider>
        );

        expect(drawScramble).toHaveBeenCalledOnce();
        expect(drawScramble).toHaveBeenCalledWith(
            "333",
            "R U R' U'",
            expect.any(HTMLDivElement)
        );
    });

    it("should re-call drawScramble when the scramble atom changes", () => {
        store.set(scrambleAtom, "INITIAL SCRAMBLE");
        store.set(selectedEventAtom, "333");
        store.set(isScrambleLoadingAtom, false);

        const { rerender } = render(
            <Provider store={store}>
                <ScramblePreview />
            </Provider>
        );
        expect(drawScramble).toHaveBeenCalledTimes(1);

        act(() => {
            store.set(scrambleAtom, "NEW SCRAMBLE");
        });
        rerender(
            <Provider store={store}>
                <ScramblePreview />
            </Provider>
        );

        expect(drawScramble).toHaveBeenCalledTimes(2);
        expect(drawScramble).toHaveBeenLastCalledWith(
            "333",
            "NEW SCRAMBLE",
            expect.any(HTMLDivElement)
        );
    });
});
