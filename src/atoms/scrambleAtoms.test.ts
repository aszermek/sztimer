import { describe, it, expect, vi, beforeEach } from "vitest";
import { createStore } from "jotai";
import {
    scrambleAtom,
    prevScrambleAtom,
    nextScrambleAtom,
    canGetPrevScrambleAtom,
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
    });

    it("getNewScrambleAtom should fetch a new scramble and set previous", async () => {
        store.set(scrambleAtom, "INITIAL SCRAMBLE");
        await store.set(getNewScrambleAtom);

        expect(store.get(scrambleAtom)).toBe("MOCKED SCRAMBLE");
        expect(store.get(prevScrambleAtom)).toBe("INITIAL SCRAMBLE");
        expect(store.get(canGetPrevScrambleAtom)).toBe(true);
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

    it("goToNextScrambleAtom should move next scramble to current if it exists", () => {
        store.set(scrambleAtom, "CURRENT");
        store.set(nextScrambleAtom, "NEXT");

        store.set(goToNextScrambleAtom);

        expect(store.get(scrambleAtom)).toBe("NEXT");
        expect(store.get(prevScrambleAtom)).toBe("CURRENT");
        expect(store.get(nextScrambleAtom)).toBe("");
        expect(store.get(canGetPrevScrambleAtom)).toBe(true);
    });

    it("goToNextScrambleAtom should fetch a new scramble if next does not exist", async () => {
        store.set(scrambleAtom, "CURRENT");
        store.set(nextScrambleAtom, ""); // No next scramble

        await store.set(goToNextScrambleAtom);

        expect(store.get(scrambleAtom)).toBe("MOCKED SCRAMBLE");
        expect(store.get(prevScrambleAtom)).toBe("CURRENT");
    });
});
