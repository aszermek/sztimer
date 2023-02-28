import { makeAutoObservable } from "mobx";
import { IChartData } from "../models/IChartData";
import { IResult } from "../models/IResult";
import { ResultsStore } from "./ResultsStore";

export class StatisticsStore {
    ResultsStore: ResultsStore;

    constructor(resultsStore: ResultsStore) {
        this.ResultsStore = resultsStore;

        makeAutoObservable(this, {});
    }

    get results() {
        return this.ResultsStore.filteredResults;
    }

    get solveCount(): number {
        return this.results.length;
    }

    get validSolveCount(): number {
        return this.results.filter((r) => r.penalty != "dnf").length;
    }

    get mean(): number {
        if (this.validSolveCount) {
            return (
                this.results
                    .filter((r) => r.penalty != "dnf")
                    .reduce((a, b) => {
                        return a + b.time;
                    }, 0) / this.validSolveCount
            );
        }
        return null;
    }

    get ao5s(): number[] {
        return this.getAverages(5);
    }

    get bestAo5(): number {
        return Math.min(...this.ao5s);
    }

    get ao12s(): number[] {
        return this.getAverages(12);
    }

    get bestAo12(): number {
        return Math.min(...this.ao12s);
    }

    get ao50s(): number[] {
        return this.getAverages(50);
    }

    get bestAo50(): number {
        return Math.min(...this.ao50s);
    }

    get ao100s(): number[] {
        return this.getAverages(100);
    }

    get bestAo100(): number {
        return Math.min(...this.ao100s);
    }

    get bestSingle(): number {
        return Math.min(...this.results.map((r) => r.time));
    }

    get worstSingle(): number {
        return Math.max(...this.results.map((r) => r.time));
    }

    get chartData() {
        let chartData: IChartData[] = [];

        this.results.map((result, i) => {
            let currentFive: IResult[] = this.results.slice(
                Math.max(0, i - 4),
                i + 1
            );
            let currentTwelve: IResult[] = this.results.slice(
                Math.max(0, i - 11),
                i + 1
            );
            let avgFive: number | string | null =
                currentFive.length >= 5
                    ? this.ResultsStore.calculateAvg(currentFive)
                    : null;
            let avgTwelve: number | string | null =
                currentTwelve.length >= 12
                    ? this.ResultsStore.calculateAvg(currentTwelve)
                    : null;

            chartData.push({
                id: i + 1,
                single: result.penalty === "dnf" ? null : result.time,
                avgFive,
                avgTwelve,
            });
        });

        return chartData;
    }

    getAverages = (length: number): number[] => {
        let averages: number[] = [];
        const results = this.results;
        if (results.length >= length - 1) {
            results.map((result, index) => {
                let current: IResult[] = results.slice(
                    index - length + 1,
                    index + 1
                );
                if (index >= length - 1) {
                    let avg = this.ResultsStore.calculateAvg(current);
                    if (typeof avg === "number") averages.push(avg);
                }
            });
        }
        return averages;
    };
}
