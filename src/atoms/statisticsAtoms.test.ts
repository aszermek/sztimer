import { describe, it, expect } from "vitest";
import { createStore } from "jotai";
import { statisticsAtom } from "./statisticsAtoms";
import { resultsAtom } from "./resultAtoms";
import { selectedEventAtom, selectedSessionAtom } from "./sessionAtoms";
import type { Result } from "@/types/results";

const createResult = (
    time: number,
    penalty: Result["penalty"] = null
): Result => ({
    time,
    penalty,
    scramble: "",
    date: new Date(),
    event: "333",
    session: "Default",
    comment: "",
});

describe("statisticsAtom", () => {
    it("should return default statistics for an empty results array", () => {
        const store = createStore();
        // Set all dependencies for a clean state
        store.set(resultsAtom, []);
        store.set(selectedEventAtom, "333");
        store.set(selectedSessionAtom, "Default");

        const stats = store.get(statisticsAtom);
        expect(stats.solveCount).toBe(0);
        expect(stats.mean).toBeNull();
    });

    it("should calculate basic stats correctly", () => {
        const store = createStore();
        const results = [createResult(10), createResult(15), createResult(20)];
        store.set(resultsAtom, results);
        store.set(selectedEventAtom, "333");
        store.set(selectedSessionAtom, "Default");

        const stats = store.get(statisticsAtom);
        expect(stats.solveCount).toBe(3);
        expect(stats.validSolveCount).toBe(3);
        expect(stats.mean).toBe(15);
        expect(stats.bestSingle).toBe(10);
        expect(stats.worstSingle).toBe(20);
    });

    it("should handle DNF results correctly in calculations", () => {
        const store = createStore();
        const results = [
            createResult(10),
            createResult(15, "dnf"),
            createResult(20),
        ];
        store.set(resultsAtom, results);
        store.set(selectedEventAtom, "333");
        store.set(selectedSessionAtom, "Default");

        const stats = store.get(statisticsAtom);
        expect(stats.solveCount).toBe(3);
        expect(stats.validSolveCount).toBe(2);
        expect(stats.mean).toBe(15);
    });

    it("should calculate best Ao5 correctly from a series of solves", () => {
        const store = createStore();
        const results = [
            createResult(10),
            createResult(11),
            createResult(12),
            createResult(13),
            createResult(14),
            createResult(9),
            createResult(10),
            createResult(11),
            createResult(12),
            createResult(13),
        ];
        store.set(resultsAtom, results);
        store.set(selectedEventAtom, "333");
        store.set(selectedSessionAtom, "Default");

        const stats = store.get(statisticsAtom);
        expect(stats.bestAo5).toBe(11);
    });

    it("should structure chartData correctly", () => {
        const store = createStore();
        const results = [createResult(10), createResult(12, "dnf")];
        store.set(resultsAtom, results);
        store.set(selectedEventAtom, "333");
        store.set(selectedSessionAtom, "Default");

        const stats = store.get(statisticsAtom);
        expect(stats.chartData).toHaveLength(2);
        expect(stats.chartData[0]).toEqual({
            id: 1,
            single: 10,
            ao5: null,
            ao12: null,
        });
        expect(stats.chartData[1]).toEqual({
            id: 2,
            single: null,
            ao5: null,
            ao12: null,
        });
    });
});
