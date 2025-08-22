import { describe, it, expect, vi, beforeEach } from "vitest";
import { createStore } from "jotai";
import {
    resultsAtom,
    filteredResultsAtom,
    addResultAtom,
    addPenaltyAtom,
    removeResultAtom,
    deleteAllResultsFromSessionAtom,
} from "./resultAtoms";
import { selectedEventAtom, selectedSessionAtom } from "./sessionAtoms";
import type { Result } from "@/types/results";
import type { EventType } from "@/types/events";

const { mockGetNewScramble } = vi.hoisted(() => {
    return { mockGetNewScramble: vi.fn() };
});

vi.mock("./scrambleAtoms", () => ({
    getNewScrambleAtom: { write: mockGetNewScramble },
}));

const createResult = (
    id: number,
    event: EventType,
    session: string,
    time = 10,
    penalty: Result["penalty"] = null
): Result => ({
    time,
    penalty,
    scramble: `R${id}`,
    date: new Date(id),
    event,
    session,
    comment: "",
});

describe("resultsAtoms", () => {
    // 3. Clear the hoisted mock's history before each test.
    beforeEach(() => {
        mockGetNewScramble.mockClear();
    });

    it("filteredResultsAtom should only return results for the selected event and session", () => {
        const store = createStore();
        const allResults = [
            createResult(1, "333", "Session 1"),
            createResult(2, "333", "Session 2"),
            createResult(3, "444", "Session 1"),
            createResult(4, "333", "Session 1"),
        ];
        store.set(resultsAtom, allResults);
        store.set(selectedEventAtom, "333");
        store.set(selectedSessionAtom, "Session 1");

        const filtered = store.get(filteredResultsAtom);
        expect(filtered).toHaveLength(2);
    });

    it("addResultAtom should add a result and fetch a new scramble", async () => {
        const store = createStore();
        store.set(resultsAtom, []);
        const newResult = createResult(1, "333", "Session 1");

        await store.set(addResultAtom, newResult);

        expect(store.get(resultsAtom)).toHaveLength(1);
        expect(store.get(resultsAtom)[0]).toEqual(newResult);
        expect(mockGetNewScramble).toHaveBeenCalledOnce();
    });

    it("addPenaltyAtom should add a +2 penalty and update time", () => {
        const store = createStore();
        const result = createResult(1, "333", "Session 1", 10);
        store.set(resultsAtom, [result]);

        store.set(addPenaltyAtom, { result, penalty: "+2" });

        const updatedResult = store.get(resultsAtom)[0];
        expect(updatedResult.penalty).toBe("+2");
        expect(updatedResult.time).toBe(12);
    });

    it("addPenaltyAtom should remove a +2 penalty and update time", () => {
        const store = createStore();
        const result = createResult(1, "333", "Session 1", 12, "+2");
        store.set(resultsAtom, [result]);

        store.set(addPenaltyAtom, { result, penalty: null });

        const updatedResult = store.get(resultsAtom)[0];
        expect(updatedResult.penalty).toBeNull();
        expect(updatedResult.time).toBe(10);
    });

    it("removeResultAtom should remove a specific result", () => {
        const store = createStore();
        const result1 = createResult(1, "333", "Session 1");
        const result2 = createResult(2, "333", "Session 1");
        store.set(resultsAtom, [result1, result2]);

        store.set(removeResultAtom, result1);

        const remaining = store.get(resultsAtom);
        expect(remaining).toHaveLength(1);
    });

    it("deleteAllResultsFromSessionAtom should clear results for the current session", () => {
        const store = createStore();
        const allResults = [
            createResult(1, "333", "Session 1"),
            createResult(2, "333", "Session 2"),
            createResult(3, "444", "Session 1"),
            createResult(4, "333", "Session 1"),
        ];
        store.set(resultsAtom, allResults);
        store.set(selectedEventAtom, "333");
        store.set(selectedSessionAtom, "Session 1");

        store.set(deleteAllResultsFromSessionAtom);

        const remaining = store.get(resultsAtom);
        expect(remaining).toHaveLength(2);
    });
});
