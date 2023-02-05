import { makeAutoObservable } from "mobx";
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
        return Math.min(...this.results.map(r => r.time));
    }

    get worstSingle(): number {
        return Math.max(...this.results.map(r => r.time));
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
