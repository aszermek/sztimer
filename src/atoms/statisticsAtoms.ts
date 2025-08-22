import { calculateAvg } from "@/lib/calculateAvg";
import type { ChartData } from "@/types/charts";
import { atom } from "jotai";
import { filteredResultsAtom } from "./resultAtoms";

export interface Statistics {
    solveCount: number;
    validSolveCount: number;
    mean: number | null;
    bestSingle: number | null;
    worstSingle: number | null;
    currentAo5: number | string | null;
    bestAo5: number | null;
    currentAo12: number | string | null;
    bestAo12: number | null;
    currentAo100: number | string | null;
    bestAo100: number | null;
    currentAo1000: number | string | null;
    bestAo1000: number | null;
    chartData: ChartData[];
}

const defaultStatistics: Statistics = {
    solveCount: 0,
    validSolveCount: 0,
    mean: null,
    bestSingle: null,
    worstSingle: null,
    currentAo5: null,
    bestAo5: null,
    currentAo12: null,
    bestAo12: null,
    currentAo100: null,
    bestAo100: null,
    currentAo1000: null,
    bestAo1000: null,
    chartData: [],
};

export const statisticsAtom = atom((get): Statistics => {
    const results = get(filteredResultsAtom);
    const solveCount = results.length;

    if (solveCount === 0) {
        return defaultStatistics;
    }

    const validResults = results.filter((r) => r.penalty !== "dnf");
    const validSolveCount = validResults.length;

    if (validSolveCount === 0) {
        return { ...defaultStatistics, solveCount };
    }

    const times = validResults.map((r) => r.time);
    const mean = times.reduce((a, b) => a + b, 0) / validSolveCount;
    const bestSingle = Math.min(...times);
    const worstSingle = Math.max(...times);
    const chartData: ChartData[] = [];

    const ao5s: number[] = [];
    const ao12s: number[] = [];
    const ao100s: number[] = [];
    const ao1000s: number[] = [];

    for (let i = 0; i < solveCount; i++) {
        // Calculate averages for the chart data (rolling from the start)
        const ao5Slice = results.slice(Math.max(0, i - 4), i + 1);
        const ao12Slice = results.slice(Math.max(0, i - 11), i + 1);

        const currentAo5 = ao5Slice.length >= 5 ? calculateAvg(ao5Slice) : null;
        const currentAo12 =
            ao12Slice.length >= 12 ? calculateAvg(ao12Slice) : null;

        chartData.push({
            id: i + 1,
            single: results[i].penalty === "dnf" ? null : results[i].time,
            ao5: typeof currentAo5 === "number" ? currentAo5 : null,
            ao12: typeof currentAo12 === "number" ? currentAo12 : null,
        });

        // Calculate averages for best/current stats (rolling from the end)
        const endSlice5 = results.slice(i, i + 5);
        if (endSlice5.length === 5) {
            const avg = calculateAvg(endSlice5);
            if (typeof avg === "number") ao5s.push(avg);
        }
        const endSlice12 = results.slice(i, i + 12);
        if (endSlice12.length === 12) {
            const avg = calculateAvg(endSlice12);
            if (typeof avg === "number") ao12s.push(avg);
        }
        const endSlice100 = results.slice(i, i + 100);
        if (endSlice100.length === 100) {
            const avg = calculateAvg(endSlice100);
            if (typeof avg === "number") ao100s.push(avg);
        }
        const endSlice1000 = results.slice(i, i + 1000);
        if (endSlice1000.length === 1000) {
            const avg = calculateAvg(endSlice1000);
            if (typeof avg === "number") ao1000s.push(avg);
        }
    }

    return {
        solveCount,
        validSolveCount,
        mean,
        bestSingle,
        worstSingle,
        chartData,
        currentAo5: chartData[chartData.length - 1]?.ao5 ?? null,
        bestAo5: ao5s.length > 0 ? Math.min(...ao5s) : null,
        currentAo12: chartData[chartData.length - 1]?.ao12 ?? null,
        bestAo12: ao12s.length > 0 ? Math.min(...ao12s) : null,
        currentAo100: ao100s.length > 0 ? ao100s[ao100s.length - 1] : null,
        bestAo100: ao100s.length > 0 ? Math.min(...ao100s) : null,
        currentAo1000: ao1000s.length > 0 ? ao1000s[ao1000s.length - 1] : null,
        bestAo1000: ao1000s.length > 0 ? Math.min(...ao1000s) : null,
    };
});
