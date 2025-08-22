import { describe, it, expect } from "vitest";
import { calculateAvg } from "./calculateAvg";
import type { Result } from "@/types/results";

// Helper to create simple Result objects for tests
const createResult = (
    time: number,
    penalty: Result["penalty"] = null
): Result => ({
    time,
    penalty,
    scramble: "",
    date: new Date(),
    event: "333",
    session: "1",
    comment: "",
});

describe("calculateAvg", () => {
    it("should correctly calculate a standard average of 5", () => {
        const results = [
            createResult(10), // best, excluded
            createResult(12),
            createResult(11),
            createResult(13),
            createResult(14), // worst, excluded
        ];
        // Average of 12, 11, 13 is 12
        expect(calculateAvg(results)).toBe(12);
    });

    it('should return "DNF" if there are two or more DNF results', () => {
        const results = [
            createResult(10),
            createResult(12, "dnf"),
            createResult(11),
            createResult(13),
            createResult(14, "dnf"),
        ];
        expect(calculateAvg(results)).toBe("DNF");
    });

    it("should correctly calculate an average with one DNF result", () => {
        const results = [
            createResult(10), // best, excluded
            createResult(12),
            createResult(11),
            createResult(13),
            createResult(14, "dnf"), // worst (DNF), excluded
        ];
        // Average of 12, 11, 13 is 12
        expect(calculateAvg(results)).toBe(12);
    });

    it("should correctly calculate an average with a +2 penalty", () => {
        const results = [
            createResult(10), // best, excluded
            createResult(12),
            createResult(11),
            createResult(13),
            createResult(12, "+2"), // time is 12, but this is the worst solve
        ];
        // The time prop should already have the +2 added by the atom, so we treat it as 14
        const penalizedResults = results.map((r) =>
            r.penalty === "+2" ? { ...r, time: r.time + 2 } : r
        );
        // Best: 10, Worst: 14. Average of 12, 11, 13 is 12.
        expect(calculateAvg(penalizedResults)).toBe(12);
    });

    it("should return NaN for an array with fewer than 3 results", () => {
        const results = [createResult(10), createResult(12)];
        // The result of 0/0 is NaN
        expect(calculateAvg(results)).toBeNaN();
    });
});
