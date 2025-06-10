import { atom } from "jotai";
import type { Result } from "../types/results";
import { filteredResultsAtom, calculateAvg } from "./resultAtoms";

const resultsAtom = filteredResultsAtom;

export const solveCountAtom = atom((get) => {
    const results = get(resultsAtom);
    return results.length;
});

export const validSolveCountAtom = atom((get) => {
    const results = get(resultsAtom);
    return results.filter((r) => r.penalty !== "dnf").length;
});

export const meanAtom = atom((get) => {
    const results = get(resultsAtom);
    const validSolveCount = get(validSolveCountAtom);

    if (validSolveCount > 0) {
        return (
            results
                .filter((r) => r.penalty !== "dnf")
                .reduce((a, b) => a + b.time, 0) / validSolveCount
        );
    }
    return null;
});

const getAveragesAtom = atom((get) => (length: number): number[] => {
    const results = get(resultsAtom);
    const averages: number[] = [];

    if (results.length >= length - 1) {
        results.forEach((result, index) => {
            const current: Result[] = results.slice(
                index - length + 1,
                index + 1
            );
            if (index >= length - 1) {
                const avg = calculateAvg(current);
                if (typeof avg === "number") {
                    averages.push(avg);
                }
            }
        });
    }
    return averages;
});

export const ao5sAtom = atom((get) => {
    const getAverages = get(getAveragesAtom);
    return getAverages(5);
});

export const bestAo5Atom = atom((get) => {
    const ao5s = get(ao5sAtom);
    return ao5s.length > 0 ? Math.min(...ao5s) : null;
});

export const ao12sAtom = atom((get) => {
    const getAverages = get(getAveragesAtom);
    return getAverages(12);
});

export const bestAo12Atom = atom((get) => {
    const ao12s = get(ao12sAtom);
    return ao12s.length > 0 ? Math.min(...ao12s) : null;
});

export const ao50sAtom = atom((get) => {
    const getAverages = get(getAveragesAtom);
    return getAverages(50);
});

export const bestAo50Atom = atom((get) => {
    const ao50s = get(ao50sAtom);
    return ao50s.length > 0 ? Math.min(...ao50s) : null;
});

export const ao100sAtom = atom((get) => {
    const getAverages = get(getAveragesAtom);
    return getAverages(100);
});

export const bestAo100Atom = atom((get) => {
    const ao100s = get(ao100sAtom);
    return ao100s.length > 0 ? Math.min(...ao100s) : null;
});

export const bestSingleAtom = atom((get) => {
    const results = get(resultsAtom);
    return results.length > 0 ? Math.min(...results.map((r) => r.time)) : null;
});

export const worstSingleAtom = atom((get) => {
    const results = get(resultsAtom);
    return results.length > 0 ? Math.max(...results.map((r) => r.time)) : null;
});

// export const chartDataAtom = atom((get) => {
//     const results = get(resultsAtom);
//     const chartData: IChartData[] = [];

//     results.forEach((result, i) => {
//         const currentFive: Result[] = results.slice(
//             Math.max(0, i - 4),
//             i + 1
//         );
//         const currentTwelve: Result[] = results.slice(
//             Math.max(0, i - 11),
//             i + 1
//         );

//         const ao5: number | string | null =
//             currentFive.length >= 5
//                 ? calculateAvg(currentFive)
//                 : null;
//         const ao12: number | string | null =
//             currentTwelve.length >= 12
//                 ? calculateAvg(currentTwelve)
//                 : null;

//         chartData.push({
//             id: i + 1,
//             single: result.penalty === "dnf" ? null : result.time,
//             ao5,
//             ao12,
//         });
//     });

//     return chartData;
// });

export const statisticsAtom = atom((get) => ({
    solveCount: get(solveCountAtom),
    validSolveCount: get(validSolveCountAtom),
    mean: get(meanAtom),
    ao5s: get(ao5sAtom),
    bestAo5: get(bestAo5Atom),
    ao12s: get(ao12sAtom),
    bestAo12: get(bestAo12Atom),
    ao50s: get(ao50sAtom),
    bestAo50: get(bestAo50Atom),
    ao100s: get(ao100sAtom),
    bestAo100: get(bestAo100Atom),
    bestSingle: get(bestSingleAtom),
    worstSingle: get(worstSingleAtom),
    // chartData: get(chartDataAtom),
}));
