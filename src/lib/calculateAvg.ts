import type { Result } from "@/types/results";

export const calculateAvg = (array: Result[]): number | string => {
    const dnfResults: Result[] = array.filter((r) => r.penalty === "dnf");
    if (dnfResults.length > 1) {
        return "DNF";
    }
    let worst: number;
    if (dnfResults.length > 0) {
        worst = dnfResults[0].time;
    } else {
        worst = Math.max(...array.map((r) => r.time));
    }

    let best: number;
    if (dnfResults.length > 0) {
        best = Math.min(
            ...array.filter((r) => r.penalty !== "dnf").map((r) => r.time)
        );
    } else {
        best = Math.min(...array.map((r) => r.time));
    }

    const avg: number =
        (array.reduce((a, b) => a + b.time, 0) - (best + worst)) /
        (array.length - 2);
    return avg;
};
