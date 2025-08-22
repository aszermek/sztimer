import { describe, it, expect, vi, beforeEach } from "vitest";
import { createStore } from "jotai";
import * as cubingScramble from "cubing/scramble";
import {
    scrambleAtom,
    prevScrambleAtom,
    nextScrambleAtom,
    canGetPrevScrambleAtom,
    isScrambleLoadingAtom,
    getFirstScrambleAtom,
    getNewScrambleAtom,
    goToPrevScrambleAtom,
    goToNextScrambleAtom,
} from "./scrambleAtoms";
import { selectedEventAtom } from "./sessionAtoms";

vi.mock("cubing/scramble", () => ({
    randomScrambleForEvent: vi.fn().mockResolvedValue({
        toString: () => "MOCKED SCRAMBLE",
    }),
}));

describe("scrambleAtoms", () => {
    let store: ReturnType<typeof createStore>;

    beforeEach(() => {
        store = createStore();
        store.set(selectedEventAtom, "333");
        vi.mocked(cubingScramble.randomScrambleForEvent).mockClear();
    });

    describe("getFirstScrambleAtom", () => {
        it("should fetch a scramble and set the loading state correctly", async () => {
            expect(store.get(isScrambleLoadingAtom)).toBe(false);

            const promise = store.set(getFirstScrambleAtom);
            expect(store.get(isScrambleLoadingAtom)).toBe(true);

            await promise;

            expect(store.get(scrambleAtom)).toBe("MOCKED SCRAMBLE");
            expect(store.get(isScrambleLoadingAtom)).toBe(false);
        });
    });

    describe("getNewScrambleAtom", () => {
        it("should fetch a new scramble, set previous, and handle loading state", async () => {
            store.set(scrambleAtom, "INITIAL SCRAMBLE");
            expect(store.get(isScrambleLoadingAtom)).toBe(false);

            const promise = store.set(getNewScrambleAtom);
            expect(store.get(isScrambleLoadingAtom)).toBe(true);

            await promise;

            expect(store.get(scrambleAtom)).toBe("MOCKED SCRAMBLE");
            expect(store.get(prevScrambleAtom)).toBe("INITIAL SCRAMBLE");
            expect(store.get(canGetPrevScrambleAtom)).toBe(true);
            expect(store.get(isScrambleLoadingAtom)).toBe(false);
        });
    });

    it("goToPrevScrambleAtom should move current scramble to next and previous to current", () => {
        store.set(scrambleAtom, "CURRENT");
        store.set(prevScrambleAtom, "PREVIOUS");
        store.set(canGetPrevScrambleAtom, true);

        store.set(goToPrevScrambleAtom);

        expect(store.get(scrambleAtom)).toBe("PREVIOUS");
        expect(store.get(nextScrambleAtom)).toBe("CURRENT");
        expect(store.get(canGetPrevScrambleAtom)).toBe(false);
    });

    describe("goToNextScrambleAtom", () => {
        it("should move next scramble to current if it exists", () => {
            store.set(scrambleAtom, "CURRENT");
            store.set(nextScrambleAtom, "NEXT");

            store.set(goToNextScrambleAtom);

            expect(store.get(scrambleAtom)).toBe("NEXT");
            expect(store.get(prevScrambleAtom)).toBe("CURRENT");
            expect(store.get(nextScrambleAtom)).toBe("");
            expect(store.get(canGetPrevScrambleAtom)).toBe(true);
        });

        it("should fetch a new scramble if next does not exist", async () => {
            store.set(scrambleAtom, "CURRENT");
            store.set(nextScrambleAtom, "");

            await store.set(goToNextScrambleAtom);

            expect(
                cubingScramble.randomScrambleForEvent
            ).toHaveBeenCalledOnce();

            expect(store.get(scrambleAtom)).toBe("MOCKED SCRAMBLE");
            expect(store.get(prevScrambleAtom)).toBe("CURRENT");
        });
    });
});
